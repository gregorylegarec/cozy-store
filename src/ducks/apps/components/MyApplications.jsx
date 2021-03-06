/* global cozy */
import React, { Component } from 'react'

import { translate } from 'cozy-ui/react/I18n'
import Spinner from 'cozy-ui/react/Spinner'
import withBreakpoints from 'cozy-ui/react/helpers/withBreakpoints'

import ApplicationRouting from './ApplicationRouting'
import Sections from './Sections'

import getFilteredAppsFromSearch from 'lib/getFilteredAppsFromSearch'

const { BarCenter } = cozy.bar

export class MyApplications extends Component {
  constructor(props) {
    super(props)
    props.fetchApps(props.lang)

    this.onAppClick = this.onAppClick.bind(this)
  }

  onAppClick(appSlug) {
    this.props.history.push(`/myapps/${appSlug}`)
  }

  render() {
    const {
      t,
      location,
      installedApps,
      isFetching,
      isAppFetching,
      fetchError,
      actionError,
      breakpoints = {}
    } = this.props
    const { isMobile } = breakpoints
    const filteredApps = getFilteredAppsFromSearch(
      installedApps,
      location && location.search
    )
    const title = <h2 className="sto-view-title">{t('myapps.title')}</h2>
    return (
      <div className="sto-myapps">
        {this.props.match.isExact ? (
          <div>
            {isMobile && <BarCenter>{title}</BarCenter>}
            <div className="sto-myapps-sections">
              {!isFetching && (
                <Sections
                  apps={filteredApps}
                  error={fetchError}
                  onAppClick={this.onAppClick}
                />
              )}
            </div>
          </div>
        ) : null}

        <ApplicationRouting
          installedApps={filteredApps}
          isFetching={isFetching}
          isAppFetching={isAppFetching}
          actionError={actionError}
          installApp={this.props.installApp}
          uninstallApp={this.props.uninstallApp}
          updateApp={this.props.updateApp}
          fetchLatestApp={this.props.fetchLatestApp}
          parent="myapps"
        />

        {isFetching && (
          <Spinner size="xxlarge" loadingType="appsFetching" middle />
        )}
      </div>
    )
  }
}

export default translate()(withBreakpoints()(MyApplications))
