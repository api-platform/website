import React, { Component, PropTypes } from 'react'
import AnchorJS from 'anchor-js'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

let languages = __PRISMJS_LANGUAGES__
for (let i = 0; i < languages.length; i++) {
    require('prismjs/components/prism-' + languages[i])
}

class Page extends Component {
    componentDidMount() {
        const { selectPage, fetchPage } = this.props

        selectPage(this.props.params.splat)
        fetchPage(this.props.params.splat).then(() => {
            (new AnchorJS()).add()
            Prism.highlightAll()

            if ('undefined' !== typeof window && '' !== window.location.hash) {
                window.location.href = window.location.hash
            }
        })
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
        // The HTML is properly sanitized by the Go JSON-LD generator.
        return (
            <article className="page" dangerouslySetInnerHTML={this.getHtml()}></article>
        )
    }
}

Page.propTypes = {
    selectedPage: PropTypes.string.isRequired,
    pages: PropTypes.object
}

export default Page
