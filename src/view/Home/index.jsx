import React, { Component } from "react";
import { Carousel, Flex, Grid, WingBlank } from "antd-mobile";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import image1 from "../../assets/images/nav-1.png";
import image2 from "../../assets/images/nav-2.png";
import image3 from "../../assets/images/nav-3.png";
import image4 from "../../assets/images/nav-4.png";
import { BASEURL } from "../../utils/url";
import SearchHeader from '../../components/SearchHeader'
import {getLocalStorage} from '../../utils/ctiy'
class Home extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      imgHeight: 176,
      groups: null,
      news: null,
      cityName:""
    };
  }
  navs = [
    { icon: image1, text: "整租", path: "/layout/house" },
    { icon: image2, text: "合租", path: "/layout/house" },
    { icon: image3, text: "地图找房", path: "/map" },
    { icon: image4, text: "去出租", path: "/rent/add" }
  ];

  getSwiperData = async () => {
    let res = await this.$axios.get("home/swiper");
    // console.log(res);
    this.setState({
      data: res.data.body
    });
  };
  getGroupsData = async () => {
    let res = await this.$axios.get(
      '/home/groups?area=AREA%7C88cff55c-aaa4-e2e0" -H "accept: application/json'
    );
    // console.log(res)
    this.setState({
      groups: res.data.body
    });
  };
  getNewsData = async () => {
    let res = await this.$axios.get(
      `/home/news?area=AREA%7C88cff55c-aaa4-e2e0`
    );
    // console.log(res)
    this.setState({
      news: res.data.body
    });
  };
 async componentDidMount() {
    const {label} = await getLocalStorage()

    this.setState({
      cityName:label
    })
    this.getSwiperData();
    this.getGroupsData();
    this.getNewsData();
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  MySwiper = () => {
    return (
      <Carousel autoplay infinite>
        {this.state.data.map(item => (
          <a
            key={item.id}
            href="http://www.alipay.com"
            style={{
              display: "inline-block",
              width: "100%",
              height: this.state.imgHeight
            }}
          >
            <img
              src={`${BASEURL}${item.imgSrc}`}
              alt=""
              style={{ width: "100%", verticalAlign: "top" }}
              onLoad={() => {
                window.dispatchEvent(new Event("resize"));
                this.setState({ imgHeight: "auto" });
              }}
            />
          </a>
        ))}
      </Carousel>
    );
  };
  myNav = () => {
    return (
      <div className={styles.nav}>
        <Flex>
          {this.navs.map(item => {
            return (
              <Flex.Item key={item.text}>
                <Link to={item.path}>
                  <img src={item.icon} alt="" />
                  <p>{item.text}</p>
                </Link>
              </Flex.Item>
            );
          })}
        </Flex>
      </div>
    );
  };
  myGroups = () => {
    return (
      <div className={styles.groups}>
        <Flex justify="between">
          <div className={styles.title}>租房小组</div>
          <div align="end">更多</div>
        </Flex>
        <Grid
          data={this.state.groups}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={dataItem => {
            return (
              <div key={dataItem.id} className={styles.navItem}>
                <div className={styles.left}>
                  <p>{dataItem.title}</p>
                  <p>{dataItem.desc}</p>
                </div>
                <div className={styles.right}>
                  <img src={`${BASEURL}${dataItem.imgSrc}`} alt="" />
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  };
  myNews = () => {
    return (
      <div className={styles.news}>
        <h3 className={styles.groupTitle}>最新咨询</h3>
        {this.state.news.map(item => {
          return (
          <WingBlank key={item.id} size="md">
              <div className={styles.newsItem}>
              <div className={styles.imgWrap}>
                <img src={`${BASEURL}${item.imgSrc}`} alt="" />
              </div>
              <Flex direction="column" justify="between" align="center" className={styles.content}>
                  <h3 className={styles.title}>{item.title}</h3>
                  
                   <Flex justify="between" direction="row" className={styles.info}>
                   <span>{item.date}</span>
                    <span>{item.from}</span>
                    </Flex>
              </Flex>
            </div>
          </WingBlank>
          );
        })}
      </div>
    );
  };
  render() {
    const { data, groups,news,cityName } = this.state;
    return (
      <div>
        <SearchHeader cityName={cityName}></SearchHeader>
        <div className={styles.swiper}>
          {data && this.MySwiper()}
          {this.myNav()}
          {groups && this.myGroups()}
          {news&&this.myNews()}
        </div>
      </div>
    );
  }
}

export default Home;
