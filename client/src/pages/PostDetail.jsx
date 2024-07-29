import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom';
import Thumbnail from '../img/blog22.jpg'

const PostDetail = () => {
  return (
    <section className='post-detail'>
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/popsts/werwer/edit`} className='btn sm primary'>Edit</Link>
            <Link to={`/popsts/werwer/delete`} className='btn sm danger'>Delete</Link>
          </div>

        </div>
        <h1>Thise is a post title</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere animi quasi, architecto exercitationem recusandae eaque ratione quas explicabo voluptatum rem veritatis molestias est in, repudiandae atque tenetur necessitatibus praesentium corrupti? Quia error id illo, eos placeat quibusdam facere unde deleniti neque atque est sit delectus? Sed sunt eligendi deleniti nisi? Eligendi error quidem magni fuga vitae perspiciatis sequi itaque. Repellendus aut doloribus nihil. Magni illum excepturi laborum unde consequatur ipsam temporibus quibusdam. Accusamus recusandae dolorem repudiandae iusto nam ipsa optio illo? Error laborum quis numquam odio accusantium magni ex, laudantium in blanditiis aperiam perspiciatis. Quia, eos tenetur. Unde, reiciendis fugiat.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eum nesciunt ab iste. Sequi, quidem soluta quae ipsa, sint necessitatibus quas quos optio accusantium harum iure debitis! Unde rem sint ducimus numquam, dignissimos totam autem eligendi id aliquam doloribus optio magnam ea animi quae aperiam minus est obcaecati molestias labore ipsum minima quisquam reprehenderit. Mollitia nemo nobis quis, aliquam libero accusantium, nostrum, corporis excepturi at enim eaque! Consectetur aperiam nostrum fuga quasi, ipsa atque natus, debitis alias vitae officiis veritatis laborum. Voluptatibus ducimus natus obcaecati dignissimos et a aperiam nemo facilis labore voluptas? Harum nihil dignissimos corporis itaque totam minus.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur culpa nesciunt laborum expedita totam eaque pariatur facilis aut officia similique. Illo officia reprehenderit aliquam? Aliquam voluptate reiciendis doloremque amet, ipsa laudantium consequatur exercitationem beatae harum quibusdam quia! Nesciunt, asperiores quae placeat illum minus excepturi harum a voluptatum blanditiis, aliquid error ea, facilis temporibus quisquam impedit reiciendis neque minima nemo. Laudantium iure sequi totam eum, magnam molestiae dolores! Praesentium rerum vel molestias placeat ex quos consectetur inventore ea odio ratione in aut quidem, blanditiis facere quibusdam! Odit facilis architecto voluptatum quia nam accusantium, nulla ipsum enim molestias pariatur eaque dicta ab similique maxime praesentium, ut eos quam facere suscipit. Iste in tempore expedita at consectetur exercitationem dolor officia, earum necessitatibus beatae dicta nostrum iure blanditiis voluptas atque possimus minus? Necessitatibus incidunt natus iste! Numquam eius voluptatem, dicta delectus placeat deleniti modi, illo, debitis sit a quia. Enim nobis iste eius. Magnam sed accusantium, dolorum odit, facere eius, veniam laudantium corporis velit necessitatibus provident similique assumenda temporibus inventore atque rem incidunt. Sit consequuntur cumque porro earum quisquam vitae dolorem aperiam ut quibusdam inventore eum consectetur, pariatur unde. Corrupti, suscipit? Illo voluptatibus quo accusamus, libero quam, ab vero quas amet, asperiores quasi quaerat!</p>
      </div>
    </section>
  )
}

export default PostDetail
