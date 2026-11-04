<script lang="ts">
  import OffsetsShaderBackground from "./OffsetsShaderBackground.svelte";

  /**
   * @deprecated Replaced by OffsetsShaderBackground (Offsets 4 WebGPU shader).
   * Kept for backwards compatibility.
   */
  export let id: string = "particles-bg";
</script>

<OffsetsShaderBackground {id} />
