import { StackMap } from "@/components/three/stack-map/StackMap";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export function Stack({ dict }: { dict: Dictionary["stack"] }) {
  return <StackMap dict={dict} />;
}
