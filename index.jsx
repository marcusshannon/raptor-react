import React from 'react';
import ReactDOM from 'react-dom';
var rp = require('request-promise');
var moment = require('moment');

class Logo extends React.Component {
  render() {
    return (
      <h1 className="display-3">{this.props.name}</h1>
    );
  }
}

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    rp(process.env.URL + "data").then(function(res) {
      this.setState({
        data: JSON.parse(res).map(x => {x.date = new Date(x.date); return x}).sort((a, b) => a.date > b.date)
      });
      var labels = this.state.data.map(x => new moment(x.date).format("MMM D"));
      var series = [this.state.data.map(x => x.value)];
      var data = {labels: labels, series: series};
      var options = {
        fullWidth: true,
        height: 500,
        low: 0,
        high: 1,
        showArea: true,
        showPoint: false,
        chartPadding: {
          right: 50
        },
        axisX: {
          showGrid: true
        },
        axisY: {
          showGrid: false,
          showLabel: false
        }
      };
      var chart = new Chartist.Line('.ct-chart', data, options);
    }.bind(this));
  }
  render() {
    return (<div className="ct-chart"></div>);
  }
}


class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var post = new XMLHttpRequest();
    post.open("POST", this.props.value);
    post.send();
  }

  render() {
    return (
      <div className="button col-md-6" onClick={this.handleClick}>{this.props.emoji}</div>
    );
  }
}

ReactDOM.render(
  <div>
    <Logo name="Raptors"/>
    <Graph/>
    <div className="row">
      <Button value="a" emoji="😁"/>
      <Button value="b" emoji="🙂"/>
    </div>
    <div className="row">
      <Button value="c" emoji="🙁"/>
      <Button value="d" emoji="😠"/>
    </div>
  </div>,
  document.getElementById('root')
);
