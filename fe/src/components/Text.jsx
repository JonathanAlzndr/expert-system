export const H1 = ({ children, variant = "white" }) => (
  <h1 className={`text-${variant} text-4xl font-semibold text-shadow-sm`}>
    {children}
  </h1>
);
export const H2 = ({ children, variant = "white" }) => (
  <h2 className={`text-${variant} text-2xl font-semibold`}>{children}</h2>
);
export const H3 = ({ children, variant = "white" }) => (
  <h3 className={`text-xl font-semibold text-${variant}`}>{children}</h3>
);
export const H4 = ({ children, variant = "white" }) => (
  <h4 className={`font text-lg text-${variant} opacity-80`}>{children}</h4>
);
export const P = ({ children, variant = "white" }) => (
  <p className={`text-lg text-${variant}`}>{children}</p>
);
