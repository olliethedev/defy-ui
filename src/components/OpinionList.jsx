import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchOpinions } from "../actions/opinions";
import "./OpinionList.scss";
import Button from "../components/Button";
import OpinionCard from "../components/OpinionCard";
import { Loader } from "./Loader";

class OpinionList extends PureComponent {
  constructor(props) {
    super(props);
    const { debateId, fetchOpinions } = this.props;
    // todo validate debateId
    // todo add loading state
    fetchOpinions(debateId, false);
  }

  render() {
    const { debateId, opinions, lastItem } = this.props;
    return (
      <div>
        {opinions.data ? (
          <div className="OpinionList">
            <div className="OpinionList__opinions-container">
              {opinions.data && (
                <div className="OpinionList__opinions-container__list">
                  {opinions.data.opinions.map((opinion, i) => (
                    <div
                      key={i}
                      className="OpinionList__opinions-container__list__item"
                    >
                      <OpinionCard
                        content={opinion.content}
                        contentType={opinion.contentType}
                        created={opinion.created}
                        pro={opinion.pro}
                        stake={opinion.stake}
                        createdByMe={opinion.createdByYou}
                      />
                    </div>
                  ))}
                  <div className="OpinionList__opinions-container__list__end">
                    {opinions.data.page + 1 < opinions.data.pages ? (
                      <>
                        <div className="OpinionList__opinions-container__list__end__patch" />
                        <Button
                          onClick={() =>
                            this.props.fetchOpinions(debateId, true)
                          }
                        >
                          {" "}
                          Load more
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="OpinionList__opinions-container__list__end__patch" />
                        {lastItem}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
OpinionList.propTypes = {
  opinions: PropTypes.object,
  debateId: PropTypes.string.isRequired,
  lastItem: PropTypes.element.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchOpinions: (debateId, loadNextPage) =>
    dispatch(fetchOpinions(debateId, loadNextPage)),
});
const mapStateToProps = (state) => ({
  opinions: state.opinionList,
});
export default connect(mapStateToProps, mapDispatchToProps)(OpinionList);
