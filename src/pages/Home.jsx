import React from "react";
import "./Home.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Toggle from "../components/Toggle";
import Dropdown from "../components/Dropdown";
import DebateList from "../components/DebateList";
import { openCreateDebateDialog } from "../actions/ui";
import {  fetchDebatesWithFilter } from "../actions/debates";
import DebateFilter from "../models/DebateFilter";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showActive:true}
    props.fetchDebatesWithFilter(new DebateFilter(true));
  }
  onCreateDebate = () => {
    this.props.openCreateDebateDialog();
  };

  onActiveToggled = (finished) => {
    this.setState({ showActive: !finished });
    this.props.fetchDebatesWithFilter(new DebateFilter(finished));
  };

  render() {
    return (
      <div className="Home">
        <div className="Home__content">
          <span className="Home__content__heading">Debates</span>
          <div className="Home__content__controls">
            <Toggle
              left={true}
              leftText="Active"
              rightText="Closed"
              onChange={this.onActiveToggled}
            />
            &nbsp;&nbsp;&nbsp;
            <Dropdown />
          </div>
          <DebateList />
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  openCreateDebateDialog: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  openCreateDebateDialog: () => dispatch(openCreateDebateDialog()),
  fetchDebatesWithFilter: (newFilter) =>
    dispatch(fetchDebatesWithFilter(newFilter)),
});

export default connect(null, mapDispatchToProps)(Home);