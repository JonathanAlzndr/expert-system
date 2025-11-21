export const H1 = ({ children, variant = "white" }) => (
  <h1 className={`text-${variant} text-4xl font-semibold text-shadow-sm`}>
    {children}
  </h1>
);
export const H2 = ({ children }) => (
  <h2 className="text-2xl font-semibold text-black">{children}</h2>
);
export const H3 = ({ children }) => (
  <h3 className="text-xl font-semibold text-black">{children}</h3>
);
export const H4 = ({ children }) => (
  <h4 className="font text-lg text-black opacity-80">{children}</h4>
);
export const P = ({ children }) => <p className="text-lg">{children}</p>;
