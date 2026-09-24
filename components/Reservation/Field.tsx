import styles from "./reservation.module.css";

/** id of the error message for a control — for aria-describedby. */
export const errorId = (id: string) => `${id}-error`;

/**
 * Inline error: an icon and the words, never colour alone. Rendered only when
 * there is a message, and referenced by the control's aria-describedby, so a
 * screen reader reads it with the field.
 */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={errorId(id)} className={styles.error}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <circle cx="8" cy="8" r="6.75" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.25" r="0.9" fill="currentColor" />
      </svg>
      {message}
    </p>
  );
}

type FieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

/** Label, control, error — the standard stack for a single input. */
export function Field({ id, label, optional, error, className, children }: FieldProps) {
  return (
    <div className={`${styles.field} ${className ?? ""}`} data-invalid={Boolean(error)}>
      <label htmlFor={id} className={`label ${styles.fieldLabel}`}>
        {label}
        {optional && <span className={styles.optional}> (Optional)</span>}
      </label>
      {children}
      <FieldError id={id} message={error} />
    </div>
  );
}
