import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./story.module.css";

export function StoryCTA({ label, href }: { label: string; href: string }) {
  return (
    <Reveal className={styles.cta}>
      <Button variant="secondary" href={href}>
        {label}
      </Button>
    </Reveal>
  );
}
