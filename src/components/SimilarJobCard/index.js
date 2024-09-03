import './index.css'

const SimilarJobCard = props => {
  const {job} = props
  const {companyLogoUrl, jobDescription, rating, title} = job
  return (
    <li className="details-view list-type">
      <div className="logo-details">
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div>
          <h1>{title}</h1>
          <p>{rating}</p>
        </div>
      </div>
      <h3>Description</h3>
      <p>{jobDescription}</p>
    </li>
  )
}

export default SimilarJobCard
