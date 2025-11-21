export const H1 = ({ children, variant = "text-white" }) => (
  <h1 className={`${variant} text-4xl font-semibold text-shadow-sm`}>
    {children}
  </h1>
);
export const H2 = ({ children, variant = "text-white" }) => (
  <h2 className={`${variant} text-2xl font-semibold`}>{children}</h2>
);
export const H3 = ({ children, variant = "text-white" }) => (
  <h3 className={`text-xl font-semibold ${variant}`}>{children}</h3>
);
export const H4 = ({ children, variant = "text-white" }) => (
  <h4 className={`font text-lg ${variant} opacity-80`}>{children}</h4>
);
export const P = ({ children, variant = "text-white" }) => (
  <p className={`text-lg ${variant}`}>{children}</p>
);
