import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { withRouter } from 'react-router-dom'
import { NavBar} from 'antd-mobile';

function NavHeader ({children,history}){
    return(
        <NavBar
        className={styles.navBar}
        mode="light"
        icon={<i className="iconfont icon-back"/>}
        onLeftClick={() => history.goBack()}
      >
    {children}
      </NavBar>
    )
}
NavHeader.propTypes ={
   children:PropTypes.string.isRequired
}
NavHeader.defaultProps ={
    children:""
}
export default withRouter(NavHeader)