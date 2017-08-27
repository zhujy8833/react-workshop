import {PureComponent} from 'react';

export default class App extends PureComponent {
  render() {
    return(
      <div>
        <h1>hello world</h1>
        <p>test</p>
        <aside>
          <label htmlFor="field">Label</label>
          <input id="field" type="text" value="JZ"/>
        </aside>
      </div>
    );
  }
}
