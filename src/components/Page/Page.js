import React, { Component, PropTypes } from 'react'

class Page extends Component {
    componentDidMount() {
        const { selectPage, fetchPage } = this.props
        selectPage()
        fetchPage()
    }

    getHtml() {
        return {
            __html: this.props.pages[this.props.selectedPage] ? this.props.pages[this.props.selectedPage].data.text : ''
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
