import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'

import Header from '../Header'
import JobCard from '../JobCard'
import Profile from '../Profile'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    typeList: [],
    salaryUpto: '',
    search: '',
    jobs: [],
    apiStatus: apiStatusConstants.initial,
    noJobs: false,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {typeList, salaryUpto, search} = this.state
    console.log(typeList)
    const employmentType = typeList.join(',')

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryUpto}&search=${search}`
    const response = await fetch(url, options)
    if (response.ok) {
      const result = await response.json()

      if (result.total) {
        const updatedData = result.jobs.map(each => ({
          id: each.id,
          title: each.title,
          rating: each.rating,
          location: each.location,
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          jobDescription: each.job_description,
          packagePerAnnum: each.package_per_annum,
        }))
        this.setState({
          jobs: updatedData,
          apiStatus: apiStatusConstants.success,
          noJobs: false,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.success, noJobs: true})
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSearch = event => {
    this.setState({search: event.target.value}, this.getJobDetails)
  }

  onClickSalary = event => {
    this.setState({salaryUpto: event.target.value}, this.getJobDetails)
  }

  checkemploymentType = event => {
    const {typeList} = this.state

    if (!typeList.includes(event.target.value)) {
      this.setState(
        prevState => ({
          typeList: [...prevState.typeList, event.target.value],
        }),
        this.getJobDetails,
      )
    } else {
      this.setState(
        prevState => ({
          typeList: prevState.typeList.filter(
            item => item !== event.target.value,
          ),
        }),
        this.getJobDetails,
      )
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

  renderNoJobView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>we could not find any jobs. Try other filters</p>
    </div>
  )

  renderSuccessView = () => {
    const {jobs, noJobs} = this.state
    if (noJobs) {
      return this.renderNoJobView
    }

    return (
      <ul className="job-unordered-list">
        {jobs.map(each => (
          <JobCard key={each.id} job={each} />
        ))}
      </ul>
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

  renderListValues = () => (
    <>
      <hr />
      <div className="options-view">
        <h4>Type of Employment</h4>
        {employmentTypesList.map(each => (
          <div>
            <input
              type="checkbox"
              value={each.employmentTypeId}
              key={each.employmentTypeId}
              id={each.employmentTypeId}
              onClick={this.checkemploymentType}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </div>
        ))}
      </div>
      <hr />
      <div className="options-view">
        <h1>Salary Range</h1>
        {salaryRangesList.map(each => (
          <div>
            <input
              type="radio"
              value={each.salaryRangeId}
              key={each.salaryRangeId}
              name="salaryRangesList"
              onChange={this.onClickSalary}
            />
            <label id={each.employmentTypeId}>{each.label}</label>
          </div>
        ))}
      </div>
    </>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="job-container">
        <Header />
        <div className="job-block">
          <div className="job-profiles">
            <Profile />
            {this.renderListValues()}
          </div>
          <div className="job-details">
            <div>
              <input
                type="search"
                placeholder="Search"
                onChange={this.onSearch}
              />
              <button type="button" data-testid="searchButton" className="btn">
                <BsSearch className="search-icon" />.
              </button>
            </div>
            {this.renderSearch()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
