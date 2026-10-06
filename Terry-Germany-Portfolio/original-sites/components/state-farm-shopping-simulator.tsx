const shoppingSimulatorUrl = 'https://false-stark-55161277.figma.site/shopping';

export default function StateFarmShoppingSimulator() {
  return <figure className="sf-walkthrough sf-shopping-simulator" aria-labelledby="sf-shopping-simulator-title">
    <div className="sf-walkthrough-heading"><div><span className="study-kicker">Interactive prototype · Shopping</span><h3 id="sf-shopping-simulator-title">Try the shopping experience.</h3></div><a className="sf-simulator-open" href={shoppingSimulatorUrl} target="_blank" rel="noopener noreferrer">Open full-size <span aria-hidden="true">↗</span></a></div>
    <iframe className="sf-shopping-frame" src={shoppingSimulatorUrl} title="State Farm Digital Assistant shopping simulator" loading="lazy" allow="fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>
    <figcaption>Explore the Digital Assistant shopping flow. <a href={shoppingSimulatorUrl} target="_blank" rel="noopener noreferrer">Open the simulator in a new tab</a> if it does not load here.</figcaption>
  </figure>;
}
