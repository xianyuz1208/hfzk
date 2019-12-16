import React, { Component } from 'react';
import styles from './index.module.scss'

import NavHeader from '../../components/NavHeader'
import {setCity,getLocalStorage} from '../../utils/ctiy';
import {AutoSizer, List} from 'react-virtualized';
import { Toast } from 'antd-mobile';
const TITLE_HEIGHT = 36
const ROW_HEIGHT = 50
const HOT_CITYNAMES = ['北京','上海','广州','深圳']
class CityList extends Component {
    constructor(){
        super()
        this.state = {
        cityListObj:{},
        cityIndexList:[],
        activeIndex:0
        }

    }
    toggle = item =>{
        if(!HOT_CITYNAMES.includes(item.label)){
            Toast.info('该城市暂无房源哦~',1)
            return
        }

        setCity({label:item.label,value:item.value})

        this.props.history.goBack()
    }
    listRef = React.createRef()
    componentDidMount(){
        this.getCityListData()
    }
    getCityListData = async() =>{
       let res = await this.$axios.get('area/city?level=1')
    //    console.log(res)
       this.dealWithCityData(res.data.body)
    }
    dealWithCityData = async(list) =>{
        let tempObj = {}
       list.forEach(item => {
        let firstLetter = item.short.substr(0,1)
        if(tempObj[firstLetter]){
            tempObj[firstLetter].push(item)
        }else{
            tempObj[firstLetter] = [item]
        }
       })
       
       let tempIndex = Object.keys(tempObj).sort()
       let res = await this.$axios.get('/area/hot')
    //    console.log(res)
        tempIndex.unshift('hot')
        tempObj['hot'] = res.data.body
        // console.log(cityListObj)
        const locationCity = await getLocalStorage()
        tempIndex.unshift('#')
        tempObj['#'] = [locationCity]
        this.setState({
            cityListObj:tempObj,
            cityIndexList:tempIndex
        })
        
    }
    formatLetter = letter => {
        switch(letter){
            case '#':
                return '定位城市'
                case 'hot':
                    return '热门城市'
            default:
                return letter.toUpperCase()        
        }
    }

    rowRenderer = ({key, index, style}) => {
        const letter = this.state.cityIndexList[index]
        const list = this.state.cityListObj[letter]
        return (
          <div className={styles.city} key={key} style={style}>
            <div className={styles.title}>{this.formatLetter(letter)}</div>
            {list.map(item =>{
                return (
                    <div onClick={() => this.toggle(item)} key={item.value} className={styles.name}>
                        {item.label}
                    </div>
                )
            })}
          </div>
        );
      }
      calcRowHeight = ({index}) => {
          const cityIndex = this.state.cityIndexList[index]
          const list = this.state.cityListObj[cityIndex]

          return TITLE_HEIGHT + list.length * ROW_HEIGHT
      }
      renderCityIndexList = () =>{
          const {cityIndexList,activeIndex} = this.state

         return (
             <div className ={styles.cityIndex}>
             {cityIndexList.map((item,index)=>{
                 return(
                     <div 
                     key={item}
                     className={styles.cityIndexItem}
                     onClick = {() => this.clickIndex(index)}
                     >
                    <span className={index === activeIndex ? styles.indexActive : ''}>
                     {item === 'hot' ? '热' : item.toUpperCase()}
                    </span>
                     </div>
                 )
             })}
             </div>
         )
      }
    onRowsRendered = ({startIndex}) => {
        if(this.state.activeIndex !== startIndex){
            this.setState({
                activeIndex:startIndex
            })
        }
    }
    clickIndex = index =>{
        this.listRef.current.scrollToRow(index)
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return;
        };
      }
    render() {
        const {cityListObj,cityIndexList} = this.state
        return (
            <div className={styles.citylist}>
                <NavHeader>城市选择</NavHeader>
                {
                    cityListObj && (
                        <AutoSizer>
                        {({height, width}) => (
                          <List
                            ref={this.listRef}
                            height={height}
                            rowCount={cityIndexList.length}
                            rowHeight={this.calcRowHeight}
                            rowRenderer={this.rowRenderer}
                            onRowsRendered={this.onRowsRendered}
                            width={width}
                            scrollToAlignment="start"
                          />
                        )}
                      </AutoSizer>
                    )}
                    {cityIndexList && this.renderCityIndexList()}
            </div>
        );
    }
}

export default CityList;
