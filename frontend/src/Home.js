import React from 'react';
import ProfileCard from './ProfileCard';

const Home = ({profileCardInfo}) => {
  return (
    <div className='home-container'>
        <div className='home-body'>
            <div className='h1-div'>
              <h1 className='home-body-h1-1'>Meet your next&nbsp;</h1><h1 className='home-body-h1-2'>Software Engineer</h1>
            </div>

            {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora itaque 
                cupiditate velit. Non neque quibusdam nihil totam corrupti porro nam eveniet
                nemo mollitia autem. Dicta ab vel veritatis pariatur numquam blanditiis 
                minus, est hic necessitatibus fugiat quam saepe enim molestias repellat 
                omnis unde debitis quia ea, rem cupiditate sapiente. Deserunt.
            </p><br /> */}
            {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque 
                praesentium explicabo dignissimos rerum et similique cumque, deleniti, 
                asperiores iste dolore, nostrum velit? Corporis enim saepe quidem repellat
                 libero eum ipsam. Iusto repellendus eos mollitia, repudiandae eius 
                 perferendis quidem minus. Voluptatem magni amet aliquid alias porro nobis impedit 
                 quo minus doloribus minima, labore neque quisquam numquam facere sit, quod ratione 
                 iusto omnis commodi perspiciatis, possimus placeat velit quibusdam laborum. 
                 Molestiae expedita quo exercitationem, ex animi dolorum provident quisquam 
                 quidem consequuntur totam laboriosam hic ipsum dolor sit. At corrupti dolorum 
                 accusantium laborum eaque magnam laboriosam sit officia repellendus. Velit 
                 nihil alias ipsam dicta explicabo consequatur repellendus quam dolores neque 
                 odit. Perferendis aliquid repellendus, fugiat minus, non dignissimos eius 
                 ducimus distinctio blanditiis aperiam at minima quae. Nobis itaque veniam sequi, 
                 ipsa minima sed nam, quis adipisci enim fugit doloremque architecto eveniet 
                 numquam facilis, tempora tenetur repellat consequatur hic similique fugiat reiciendis 
                 saepe. Fugit delectus molestiae facere laboriosam magni vitae quibusdam. Adipisci ea 
                 saepe autem laboriosam ipsa beatae omnis aliquid possimus eos porro ab dignissimos, 
                 corporis sed corrupti, soluta quia deleniti delectus temporibus sint laudantium itaque 
                 vitae accusantium similique. Ipsa eum assumenda eius non ad fuga maxime perspiciatis 
                 temporibus sed obcaecati! Voluptas, dicta molestias.
            </p> */}
            <div className='profile-card-container'>
              {profileCardInfo.map(info => {
                 return <ProfileCard infoId={info.id} infoFName={info.first_name}
                    infoLName={info.last_name} infoSummary={info.summary} infoResume={info.resume_link}
                    infoGithub={info.github_link} 
                    infoImage={info.profile_image}/>
              })}
            </div>
        </div>

        
    </div>
  )
}

export default Home
