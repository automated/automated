import GlobalStyles from '../../global-styles';

const Base = ({ children }: { children: React.ReactNode }) => (
  <>
    <GlobalStyles />
    <section
      css={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {children}
    </section>
  </>
);

export default Base;
