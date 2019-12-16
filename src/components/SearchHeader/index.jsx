import React from "react";
import styles from "./index.module.scss";
import { Flex } from "antd-mobile";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

function SearchHeader({ cityName, history }) {
  return (
    <Flex className={styles.root}>
    <Flex className={styles.searchLeft}>
          <div className={styles.location}
          onClick = {() => history.push('/citylist')}
          >
            <span>{cityName}</span>
            <i className="iconfont icon-arrow"></i>
          </div>
          <div className={styles.searchForm}>
            <i className="iconfont icon-search"></i>
            <span>请输入小区或地址</span>
          </div>
      </Flex>
      <Link to="/map">
      <i className="iconfont icon-map"></i>
      </Link>
    </Flex>
  );
}
SearchHeader.propTypes = {
  cityName: PropTypes.string.isRequired
};
export default withRouter(SearchHeader);
