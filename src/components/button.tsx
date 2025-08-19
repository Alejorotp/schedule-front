interface bProps{
    onAction: () => void;
    label: string;
}


function Button({ onAction, label } : bProps) {
  return (
    <>
      <button onClick={onAction} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700" >{label}</button>
    </>
  );
}

export default Button;
