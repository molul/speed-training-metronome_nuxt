<script setup lang="ts">
interface Props {
  label?: string;
  icon?: string;
  fullWidth?: boolean;
  size?: "normal" | "big";
  severity?: string;
  type?: "primary" | "secondary" | "text" | "alert";
  shape?: "rounded" | "square";
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  fullWidth: false,
  size: "normal",
  severity: "primary",
  shape: "square",
  disabled: false,
});
</script>

<template>
  <Button
    :severity="props.severity"
    :label="props.label"
    :disabled="props.disabled"
    :fluid="props.fullWidth"
    :class="[
      '!text-sm',
      { '!rounded-full !aspect-square': shape === 'rounded' },
      { '!rounded-md': shape === 'square' && props.size === 'normal' },
      { '!size-15 text-3xl !rounded-xl': props.size === 'big' },
    ]"
  >
    <template #icon>
      <Icon
        v-if="props.icon"
        :name="props.icon"
        :class="['', props.size === 'big' ? 'size-7! ' : 'size-5!']"
      />
    </template>
  </Button>
</template>
