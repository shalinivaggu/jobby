import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import SimilarJobCard from '../SimilarJobCard'
import JobDetailsCard from '../JobDetailsCard'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGESS',
  failure: 'FAILURE',
}

class JobDetailsView extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const result = await response.json()

      const updateJobDetails = result.job_details
      const updatedData = {
        companyLogoUrl: updateJobDetails.company_logo_url,
        companyWebsiteUrl: updateJobDetails.company_website_url,
        employmentType: updateJobDetails.employment_type,
        id: updateJobDetails.id,
        jobDescription: updateJobDetails.job_description,
        skills: updateJobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: updateJobDetails.life_at_company,
        location: updateJobDetails.location,
        packagePerAnnum: updateJobDetails.package_per_annum,
        rating: updateJobDetails.rating,
        title: updateJobDetails.title,
      }

      const updateSimilarJobs = result.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobDetails: updatedData,
        similarJobs: updateSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state

    return (
      <>
        <div className="view">
          <JobDetailsCard jobDetails={jobDetails} />
        </div>
        <div className="similarJobs-view">
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobs.map(each => (
              <SimilarJobCard key={each.id} job={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderSearch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <div className="jobdetails-view">
          <Header />
          {this.renderSearch()}
        </div>
      </>
    )
  }
}

export default JobDetailsView
