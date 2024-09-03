import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {job} = props
  const {
    id,
    title,
    rating,
    location,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
  } = job

  return (
    <Link to={`/jobs/${id}`} className="link-component">
      <li className="job-list">
        <div className="img-title-rating">
          <img src={companyLogoUrl} alt={title} />
          <div>
            <p>{title}</p>
            <p>{rating}</p>
          </div>
        </div>
        <div className="loc-details">
          <div className="loc-type">
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="description">
          <p>Description</p>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
