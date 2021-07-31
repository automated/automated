const Base = ({ children }: { children: React.ReactNode }) => (
  <button
    css={{
      padding: '20px 30px',
      borderRadius: 10,
      border: 'none',
      background: 'blue',
      color: 'white',
      fontWeight: 600,
      fontSize: 20,
    }}
  >
    {children}
  </button>
);

export default Base;
