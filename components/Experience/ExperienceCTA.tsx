import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./experience.module.css";

/** Primary, not secondary: this is where the section asks for the booking. */
export function ExperienceCTA({ label, href }: { label: string; href: string }) {
  return (
    <Reveal className={styles.cta}>
      <Button href={href}>{label}</Button>
    </Reveal>
  );
}
