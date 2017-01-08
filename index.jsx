import React from 'react';
import ReactDOM from 'react-dom';
var request = require('request');
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
    request(process.env.URL + 'data', function(err, res, body) {
      this.setState({
        data: JSON.parse(body)
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
          right: 40,
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
    request.post(process.env.URL + this.props.value);
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
