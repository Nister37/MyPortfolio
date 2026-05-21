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
  <li><strong>GitLab CI/CD</strong> â€” the pipeline runner, triggered on every push to <code>main</code>.</li>
  <li><strong>Docker</strong> â€” packages the Spring Boot JAR and its JRE into a reproducible image.</li>
  <li><strong>GitLab Container Registry</strong> â€” stores tagged images, so the VM never needs to build locally.</li>
  <li><strong>Google Compute Engine (e2-micro)</strong> â€” a single Linux VM that pulls the image and restarts the container.</li>
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
on the free tier this setup was good enough â€” it ran reliably for the full semester without manual intervention.</p>
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
<p>I fell into this on my second year project. I split a student scheduling tool into four services â€” auth,
users, timetables, notifications â€” before I had written a single business rule. Deploying locally required
Docker Compose files, shared secrets, and inter-service retries. A bug in the auth token format broke
everything silently. Debugging took three times longer than it would have on a monolith.</p>

<h2>The rule I follow now</h2>
<p>Start with the simplest structure that could work. For a backend that means:</p>
<ul>
  <li>One deployable unit.</li>
  <li>Clear package boundaries (controller â†’ service â†’ repository) that could be split later if needed.</li>
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
explain, it is probably over-engineered â€” and the complexity will be the first thing a technical reviewer asks
you to justify.</p>
<p>Simple code is not junior code. It is code that respects the reader's time.</p>
    `.trim(),
  },
];


