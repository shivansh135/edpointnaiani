import { BasicCard, BasicCardButton } from "../card/card";
import NavScrollExample from "../navbar/navbar"
import Carousel from 'react-bootstrap/Carousel';
import './home.css'
function Crausal() {
    return (
      <Carousel className="crau" >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/poster1.jpg" // Replace this URL with your actual image URL
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/slide2.jpg" // Replace this URL with your actual image URL
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/slide3.jpg" // Replace this URL with your actual image URL
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    );
  }
  
export const Home = ()=>{
    return(
        <div className="body">
         <Crausal/>

         <div className="contCard">
            <img src='/rjsir.jpg' alt="sample"></img>
            <div className="text-wrap">
                <h4>Guiding Minds, Igniting Futures: Meet the Visionary Director of Education Point</h4>
                <div className="text">
                In the hallowed halls of Education Point, where knowledge blooms and aspirations take flight, there exists a luminary who orchestrates this academic symphony. Sir Rajneesh Panday, the esteemed Director, a chemistry virtuoso, and the driving force behind countless success stories. His classroom is a crucible where elements of curiosity, dedication, and inspiration react to form brilliant minds. With a penchant for simplifying complex concepts, Rajneesh sir transforms the seemingly arcane world of chemistry into a captivating adventure. But his influence extends beyond the classroom walls. As the creator of the popular YouTube channel “Chemical Lotcha,” he demystifies chemical reactions, making them accessible to learners worldwide.
                </div>
            </div>
         </div>

         <div className="selfCard">
            <h2>Best Courses</h2>
            <div className="flex-scroll">
                <BasicCard img={'/physics.webp'} title={'Target JEE 2026'} text={"Join our JEE 2026 batch, tailored for success in cracking the exam. Enroll now for comprehensive preparation!"}/>
                <BasicCard img={'/chemistry.webp'} title={'Eklavya Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/>
                <BasicCard img={'/class.webp'} title={'Prayas Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/>
            </div>
         </div>
          <section id='offline'>
          <div className="contCard">
         <div className="text-wrap" style={{"max-width":"450px"}}>
                <h4>Our Remarkable Achievements</h4>
                <div className="text">At Education Point, our achievements speak volumes. From top exam ranks to transformative success stories, we celebrate every milestone. Our students’ victories are our own, fueling our commitment to excellence.</div>
         </div>
            <div className="styleFlexParent">
                <div className="cont4">
                    <div className="cont2">
                        <div className="smallBox">10+ Cources</div>
                        <div className="recBox">100+ Toppers</div>
                    </div>
                    <div className="cont2">
                        <div className="recBox">200+ Notes</div>
                        <div className="smallBox"> 100+ Videos</div>

                    </div>
                </div>
                <div className="bigBox">
                    1000+<br/>Students
                </div>
                
            </div>
         </div>

          </section>
         
         <div className="selfCard">
            <h2>Offline Courses</h2>
            <div className="flex-scroll">
                <BasicCardButton img={'/physics.webp'} title={'Prayas Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/>
                <BasicCardButton img={'/class.webp'} title={'Ramanujan Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/>
                <BasicCardButton img={'/physics.webp'} title={'Eklavya Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/>
                <BasicCardButton img={'/class.webp'} title={'Arjuna Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/>
            </div>
         </div>
          <section id="teachers">

          </section>
         <div className="contCard">
         <div className="text-wrap" style={{"max-width":"450px"}}>
                <h4>Guiding Stars: Our Inspirational Teachers</h4>
                <div className="text">Our teachers, those everyday heroes, illuminate our paths with knowledge and kindness. They ignite curiosity, shape futures, and leave an indelible mark. Let us celebrate these remarkable souls who nurture minds and build dreams.  </div>
         </div>
         <div className="flex-scroll" style={{width:'fit-content'}}>
            <div className="img">
                <img src='/teacher1.jpg' alt='t1'></img>
            </div>
            <div className="img">
            <img src='/teacher3.jpg' alt='t1'></img>
            </div>
            <div className="img">
            <img src='/teacher2.jpg' alt='t1'></img>

            </div>
         </div>
         </div>

         
         <div className="selfCard">
            <h2>Online Courses</h2>
            <div className="flex-scroll">
                <BasicCard img={'/physics.webp'} title={'Eklavya Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/>
                <BasicCard img={'/class.webp'} title={'Arjuna Batch'} text={"Some quick example text to build on the card title and make up the bulk of the card's content."}/>
            </div>
         </div>

        </div>
       
    )
}
