import React from 'react';
import fetch from 'isomorphic-fetch';

import Layout from '../components/Layout';
import MasterHeader from '../components/MasterHeader';
import TweetsList from '../components/TweetsList';

export default class extends React.Component {

  static async getInitialProps(context) {
    const handle = context.req.params.handle;
    // eslint-disable-next-line no-undef
    const url = handle
      ? `${TWITTER_DATA_API}/api/tweets/${handle.replace('-tweets', '')}`
      : `${TWITTER_DATA_API}/api/tweets`
    console.log(url)
    const res = await fetch(url)
    console.log(res)
    const json = await res.json()
    console.log(json)
    return {
      tweets: json.tweets,
      handle: json.handle,
    }
  }

  render() {
    let loadingMessage
    console.log(this.props.tweets)
    if (this.props.tweets.length === 0) {
      loadingMessage = '<p><i>Loading tweets…</i></p>';
    }

    return (
      <Layout>

        <MasterHeader handle={this.props.handle} />

        {loadingMessage}

        <TweetsList tweets={this.props.tweets} />

      </Layout>
    )
  }
}
