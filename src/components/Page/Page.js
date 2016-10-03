import React, { Component, PropTypes } from 'react'
import Prism from 'prismjs'

let languages = __PRISMJS_LANGUAGES__
for (let i = 0; i < languages.length; i++) {
    require('prismjs/components/prism-' + languages[i])
}

require('../../../node_modules/prismjs/themes/prism.css')

class Page extends Component {
    componentDidMount() {
        const { selectPage, fetchPage } = this.props

        selectPage(this.props.params.splat)
        fetchPage(this.props.params.splat).then(Prism.highlightAll)
    }

    getHtml() {
        if (!this.props.pages[this.props.selectedPage] || this.props.pages[this.props.selectedPage].isFetching) {
            return {
                __html: ''
            }
        }

        return {
            __html: this.props.pages[this.props.selectedPage].data.text
        }
    }

    render() {
        return (
            <div>
                {/* The HTML is properly sanitized by the Go JSON-LD generator. */}
                <div dangerouslySetInnerHTML={this.getHtml()}></div>
            </div>
        )
    }
}

Page.propTypes = {
    selectedPage: PropTypes.string.isRequired,
    pages: PropTypes.object
}

export default Page
