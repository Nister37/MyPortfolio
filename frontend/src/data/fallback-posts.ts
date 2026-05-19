import type { BlogPost } from "../lib/cms/posts";

export const fallbackPosts: BlogPost[] = [
  {
    title: "How I deployed a Spring Boot app to Google Compute Engine",
    slug: "spring-boot-google-compute-engine-deployment",
    description:
      "A step-by-step walkthrough of using GitLab CI and Docker to ship a Java application onto a fresh GCE instance.",
    tags: ["DevOps", "Spring Boot", "Google Cloud", "Docker"],
    featured: true,
    readingTime: 8,
    content: `
<h2>The problem</h2>
<p>I needed to deploy a Spring Boot REST API for the Integration 4 project onto a Google Compute Engine VM.
The team was small, the budget was the GCP free tier, and I wanted every push to <code>main</code> to reach
production without anyone manually SSH-ing into the machine. That ruled out FTP uploads and hand-rolled scripts.</p>

<h2>The stack I chose</h2>
<p>The deployment pipeline has four moving parts:</p>
<ul>
  <li><strong>GitLab CI/CD</strong> — the pipeline runner, triggered on every push to <code>main</code>.</li>
  <li><strong>Docker</strong> — packages the Spring Boot JAR and its JRE into a reproducible image.</li>
  <li><strong>GitLab Container Registry</strong> — stores tagged images, so the VM never needs to build locally.</li>
  <li><strong>Google Compute Engine (e2-micro)</strong> — a single Linux VM that pulls the image and restarts the container.</li>
</ul>

<h2>The Dockerfile</h2>
<p>I kept the image small by using a two-stage build. The builder stage compiles the JAR; the final stage runs on
a slim JRE image so the container ships without Maven or a full JDK.</p>
<pre><code>FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /build
COPY . .
RUN mvn -q package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
</code></pre>

<h2>The GitLab CI pipeline</h2>
<p>The pipeline has two stages: <code>build</code> and <code>deploy</code>. The build stage pushes a new image to
the registry. The deploy stage SSH-es into the GCE VM, pulls the image, and restarts the Docker service.</p>
<pre><code>deploy:
  stage: deploy
  only: [main]
  script:
    - ssh deployer@$GCE_IP "
        docker pull $CI_REGISTRY_IMAGE:latest &&
        docker stop api || true &&
        docker run -d --rm --name api -p 8080:8080 $CI_REGISTRY_IMAGE:latest"
</code></pre>
<p>The SSH key is stored as a masked CI/CD variable. The VM's firewall allows port 8080 only from the load
balancer, not from the public internet directly.</p>

<h2>What tripped me up</h2>
<p>The biggest time sink was the GCE firewall. I kept getting connection-refused errors in the pipeline that worked
fine locally. The VM's default firewall disallows all ingress. I needed an explicit VPC firewall rule to allow
TCP on port 22 from the GitLab runner IP range, not from <code>0.0.0.0/0</code>.</p>
<p>The second issue was Docker socket permissions. Running <code>docker</code> commands as a non-root user requires
adding that user to the <code>docker</code> group and re-logging in. The pipeline kept failing until I used
<code>newgrp docker</code> in the startup script.</p>

<h2>What I would do differently</h2>
<p>For a production service I would add a health-check endpoint, configure Docker to use a restart policy, and
front the API with a managed HTTPS load balancer instead of exposing port 8080 directly. For a student project
on the free tier this setup was good enough — it ran reliably for the full semester without manual intervention.</p>
    `.trim(),
  },
  {
    title: "What I learned from building an AI flyer extraction pipeline",
    slug: "ai-flyer-extraction-lessons",
    description:
      "Lessons from building a multi-pass Gemini extraction system: confidence scoring, clustering, and when AI is not enough.",
    tags: ["AI", "Java", "Automation"],
    featured: false,
    readingTime: 6,
    content: `
<h2>The brief</h2>
<p>Gazetkomania is a price-comparison platform for Polish supermarket flyers. Each week, dozens of flyers land as
PDFs. The task was to extract structured product data — name, price, validity dates, store — automatically rather
than by hand. I built the extraction backend in Java using the Gemini API.</p>

<h2>Why a single prompt is not enough</h2>
<p>My first attempt was a single Gemini call per page: "Extract all products as JSON." The model produced
plausible-looking output but the accuracy was inconsistent. On clean typeset flyers it worked well; on scanned
leaflets with tilted text and overlapping sale stamps it hallucinated prices, merged product names, and silently
dropped items.</p>
<p>The fix was a multi-pass approach:</p>
<ol>
  <li><strong>Pass 1 — rough extraction.</strong> Extract everything as a flat list with minimal constraints.</li>
  <li><strong>Pass 2 — validation.</strong> Re-prompt with the original image and the pass-1 output, asking the
  model to confirm or correct each item. The second pass catches obvious hallucinations because the model is
  comparing against a concrete reference it already produced.</li>
  <li><strong>Pass 3 — confidence scoring.</strong> Ask the model to assign a <code>0–1</code> confidence score
  to each item. Anything below <code>0.7</code> goes to a manual review queue instead of being published.</li>
</ol>

<h2>Clustering duplicate detections</h2>
<p>On pages with bold promotional text, Gemini would sometimes extract the same product twice — once from the
main label and once from a banner. I used a simple normalisation + Levenshtein distance check to cluster near-
duplicate product names and keep only the entry with the higher confidence score.</p>

<h2>When AI is not the answer</h2>
<p>Price parsing turned out to be more reliable with a deterministic regex than with a language model. Polish
flyers use formats like <code>2,99 zł</code>, <code>3.49</code>, and <code>4 zł 99 gr</code>. A small regex
state machine handled all three consistently. Using the LLM for price normalisation introduced variance that a
simple rule eliminated entirely.</p>
<p>The lesson: use a language model for the parts of the problem that require understanding language and layout;
use deterministic code for the parts that are really just pattern matching.</p>

<h2>What I would improve</h2>
<p>The confidence threshold of <code>0.7</code> was chosen empirically from a small test set. In production
I would track false-positive and false-negative rates per flyer template and adjust thresholds per retailer.
I would also cache page-level extraction results so re-processing a flyer after a schema change does not
call the Gemini API again for unchanged pages.</p>
    `.trim(),
  },
  {
    title: "Why I use simple architecture before adding complexity",
    slug: "simple-architecture-first",
    description:
      "A reflection on overengineering traps and how starting simple makes systems easier to reason about, debug, and hand off.",
    tags: ["Architecture", "Backend"],
    featured: false,
    readingTime: 5,
    content: `
<h2>The trap</h2>
<p>Every time I start a new project I feel the pull to reach for the full toolkit: microservices, an event bus,
a CQRS read model, a dedicated API gateway. These are real patterns that solve real problems. The trap is
reaching for them before the problem exists.</p>
<p>I fell into this on my second year project. I split a student scheduling tool into four services — auth,
users, timetables, notifications — before I had written a single business rule. Deploying locally required
Docker Compose files, shared secrets, and inter-service retries. A bug in the auth token format broke
everything silently. Debugging took three times longer than it would have on a monolith.</p>

<h2>The rule I follow now</h2>
<p>Start with the simplest structure that could work. For a backend that means:</p>
<ul>
  <li>One deployable unit.</li>
  <li>Clear package boundaries (controller → service → repository) that could be split later if needed.</li>
  <li>No infrastructure component I cannot run with a single <code>docker run</code> command.</li>
</ul>
<p>This is not "write bad code." Package structure, naming, and test coverage matter just as much in a
monolith. The difference is that complexity is added to solve an identified problem, not anticipated before it
arrives.</p>

<h2>When I do add complexity</h2>
<p>I add a new service or infrastructure component when one of these is true:</p>
<ul>
  <li>A single component has unacceptably different scaling requirements from the rest.</li>
  <li>Two teams need to deploy independently without coordinating releases.</li>
  <li>A third-party integration is unreliable enough that isolating it behind a queue protects the main flow.</li>
</ul>
<p>None of these applied to my student projects. They do apply in professional work, which is why the patterns
exist. The key is recognising which situation you are in.</p>

<h2>What this means for portfolio code</h2>
<p>A hiring manager reviewing a student portfolio project should be able to understand the architecture from
the README in under two minutes. If your project requires a diagram with six boxes and four message queues to
explain, it is probably over-engineered — and the complexity will be the first thing a technical reviewer asks
you to justify.</p>
<p>Simple code is not junior code. It is code that respects the reader's time.</p>
    `.trim(),
  },
];


