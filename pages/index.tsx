const Home = () => {
  return (
    <div className="container">
      <header className="mobile-header">
        <h1>Mobile View Test</h1>
        <div className="screen-size"></div>
      </header>
      
      <nav className="mobile-nav">
        <button>Menu 1</button>
        <button>Menu 2</button>
        <button>Menu 3</button>
      </nav>

      <main className="content">
        <div className="card">
          <h2>Screen Size Indicator</h2>
          <p className="hide-on-mobile">You're viewing on a larger screen</p>
          <p className="show-on-mobile">You're viewing on mobile</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
