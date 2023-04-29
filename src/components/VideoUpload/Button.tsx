interface Props {
  children: React.ReactNode;
  onClick(): void;
}
const Button = ({ children, onClick }: Props) => {
  return (
    <div
      className="bg-slate-900 text-white py-3 px-8 rounded-full my-4"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
