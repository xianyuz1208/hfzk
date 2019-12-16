import React, { Component } from "react";
import Home from "../Home";
import My from "../My";
import Info from "../Info";
import House from "../House";
import { TabBar } from "antd-mobile";
import CtiyList from '../CtiyList'
import { Link, Redirect, Switch, Route } from "react-router-dom";
import styles from "./index.module.scss";
import NotFound from "../NotFound";
class Layout extends Component {
  constructor(props) {
    super();
		console.log(222)
    this.state = {
      selectedPath:props.location.pathname
		};
		console.log(props)
  }
  
static  getDerivedStateFromProps(props,state){
    if(state.selectedPath !== props.location.pathname){
      return{
        selectedPath:props.location.pathname
      }
    }else{
      return null
    }
  }

  TABS = [
    {
      title: "首页",
      icon: "icon-index",
      path: "/layout/home"
    },
    {
      title: "找房",
      icon: "icon-findHouse",
      path: "/layout/house"
    },
    {
      title: "资讯",
      icon: "icon-info",
      path: "/layout/info"
    },
    {
      title: "我的",
      icon: "icon-my",
      path: "/layout/my"
    }
  ];
  renderTabBar = () => {
    return (
			<TabBar
			barTintColor="white"
			tintColor="pink" 
			noRenderContent
			unselectedTintColor="#949494">
			{this.TABS.map((item) =>{
				return 	<TabBar.Item
				title={item.title}
				key={item.path}
				icon={<i
					className={`iconfont ${item.icon}`} 
					style={{width: '22px',height: '22px',}}></i>}
					selected={this.state.selectedPath === item.path}
					selectedIcon = {<i
						className={`iconfont ${item.icon}`} 
						style={{width: '22px',height: '22px',}}></i>}
					onPress = { () =>{
          this.setState({
						selectedPath:item.path
					})
					if(this.state.selectedPath !== item.path){
             this.props.history.push(item.path)
					}
					}}
				/>
			})}
      </TabBar>
    );
  };

  render() {
    return (
      <div className={styles.layout}>
        <div>
          <Switch>
            <Route path="/layout/home" component={Home} />
            <Route path="/layout/house" component={House} />
            <Route path="/layout/info" component={Info} />
            <Route path="/layout/my" component={My} />
            <Redirect exact from="/layout" to="/layout/home" />
            <Route component={NotFound} />
          </Switch>
        </div>
        <div>
          <Link to="/layout/home"></Link>
          <Link to="/layout/house"></Link>
          <Link to="/layout/info"></Link>
          <Link to="/layout/my"></Link>
        </div>
        <div className={styles.tabbar}>{this.renderTabBar()}</div>
      </div>
    );
  }
}

export default Layout;
