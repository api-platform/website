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

        let doc = (new DOMParser()).parseFromString(this.props.pages[this.props.selectedPage].data.text, 'text/html')

        // Convert all links pointing to JSON-LD documents
        let anchors = doc.querySelectorAll('a')
        for (let i = 0; i < anchors.length; i++) {
            let href = anchors[i].getAttribute('href')

            if (/^(?:[a-z]+:)?\/\//i.test(href)) {
                // Make absolute URLs in target blank
                anchors[i].setAttribute('target', '_blank')
            } else {
                // Convert relative JSON-LD URLs
                anchors[i].setAttribute('href', href.replace(/index\.jsonld/, '').replace(/\.jsonld/, ''))
            }
        }

        // Convert all images
        let images = doc.querySelectorAll('img')
        for (let i = 0; i < images.length; i++) {
            let src = images[i].getAttribute('src');

            // Convert relative URLs
            if (!/^(?:[a-z]+:)?\/\//i.test(src)) {
                images[i].setAttribute('src', '/data/' + src)
            }
        }

        return {
            __html: doc.getElementsByTagName('body')[0].innerHTML
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
