import './index.css'

const JobDetailsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    skills,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  const skill = skills === undefined ? [] : skills
  const lifeAtCompanys = lifeAtCompany === undefined ? [] : lifeAtCompany

  return (
    <div className="details-view">
      <div>
        <div className="logo-details">
          <img src={companyLogoUrl} alt="job details company logo" />
          <div>
            <h1>{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div className="loc-type-sal">
          <div className="loc-type">
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div>
          <div className="dec-visit">
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
          </div>
          <p>{jobDescription}</p>
        </div>
        <div>
          <h2>skills</h2>
          <ul className="skills-list">
            {skill.map(each => (
              <li key={each.name} className="skills-list-type">
                <img src={each.imageUrl} alt={each.name} />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="life-at-company">
          <div>
            <h3>Life at Company</h3>
            <p>{lifeAtCompanys.description}</p>
          </div>
          <img src={lifeAtCompanys.image_url} alt="life at companies" />
        </div>
      </div>
    </div>
  )
}

export default JobDetailsCard
