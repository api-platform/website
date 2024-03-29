import classNames from "classnames";

interface IconProps {
  className?: string;
}

export default function Github({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={classNames("fill-current", className)}
      aria-hidden="true"
    >
      <path d="M7.48,0s-.14,.01-.24,.02C4.96,.23,2.83,1.46,1.48,3.34,.73,4.39,.25,5.58,.07,6.84c-.06,.44-.07,.57-.07,1.17s0,.73,.07,1.17c.43,3,2.57,5.53,5.47,6.46,.52,.17,1.07,.28,1.69,.35,.24,.03,1.29,.03,1.53,0,1.07-.12,1.98-.38,2.88-.84,.14-.07,.16-.09,.15-.1-.01,0-.6-.8-1.3-1.75l-1.28-1.73-1.6-2.37c-.88-1.3-1.61-2.37-1.61-2.37,0,0-.01,1.05-.02,2.34,0,2.25,0,2.34-.03,2.4-.04,.08-.07,.11-.14,.14-.05,.03-.09,.03-.33,.03h-.27l-.07-.05s-.08-.07-.1-.11l-.03-.07V5.22l.06-.06s.08-.08,.12-.1c.06-.03,.09-.03,.36-.03,.32,0,.37,.01,.46,.1,.02,.03,.89,1.33,1.93,2.91,1.04,1.57,2.46,3.72,3.16,4.78l1.27,1.92,.06-.04c.57-.37,1.17-.89,1.64-1.44,1.01-1.16,1.66-2.58,1.88-4.09,.06-.44,.07-.57,.07-1.17s0-.73-.07-1.17c-.43-3-2.57-5.53-5.47-6.46-.51-.17-1.06-.28-1.67-.35-.15-.02-1.18-.03-1.31-.02h0Zm3.28,4.84c.08,.04,.14,.11,.16,.18,.01,.04,.02,.91,.01,2.87v2.81l-.5-.76-.5-.76v-2.04c0-1.32,0-2.06,.02-2.1,.03-.09,.08-.16,.15-.2,.06-.03,.09-.04,.33-.04,.23,0,.27,0,.32,.03Z" />
    </svg>
  );
}
