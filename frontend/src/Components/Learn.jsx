// // import React from "react";
// // import { FaBookOpen, FaClock } from "react-icons/fa";
// // import "./Learn.css";

// // function Learn() {
// //   return (
// //     <div className="learn-page">
// //       {/* ======= Header ======= */}
// //       <div className="learn-header">
// //         <div className="learn-icon">
// //           <FaBookOpen size={26} />
// //         </div>
// //         <div>
// //           <h2>Learning Center</h2>
// //           <p>Educational resources about food allergies and sensitivities</p>
// //         </div>
// //       </div>

// //       {/* ======= Article Section ======= */}
// //       <div className="articles-grid">
// //         {/* Article 1 */}
// //         <div className="article-card">
// //           <div className="article-tag">Basics</div>
// //           <img
// //             src="https://images.unsplash.com/photo-1584270354949-1c3b3d3b63a3"
// //             alt="Food Allergies"
// //             className="article-img"
// //           />
// //           <div className="article-content">
// //             <h3>Understanding Food Allergies: A Comprehensive Guide</h3>
// //             <p>
// //               Learn about the most common food allergens, symptoms, and how to
// //               manage allergic reactions effectively.
// //             </p>
// //             <div className="article-footer">
// //               <span className="read-time">
// //                 <FaClock /> 5 min read
// //               </span>
// //               <a href="#" className="read-more">
// //                 Read More →
// //               </a>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Article 2 */}
// //         <div className="article-card">
// //           <div className="article-tag safety">Safety</div>
// //           <img
// //             src="https://images.unsplash.com/photo-1556911073-52527ac437f5"
// //             alt="Cross Contamination"
// //             className="article-img"
// //           />
// //           <div className="article-content">
// //             <h3>Cross-Contamination: What You Need to Know</h3>
// //             <p>
// //               Discover how cross-contamination occurs and practical tips to
// //               prevent it in your kitchen.
// //             </p>
// //             <div className="article-footer">
// //               <span className="read-time">
// //                 <FaClock /> 4 min read
// //               </span>
// //               <a href="#" className="read-more">
// //                 Read More →
// //               </a>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Learn;

import React from "react";
import { FaBookOpen, FaClock } from "react-icons/fa";
import "./Learn.css";

function Learn() {
  return (
    <div className="learn-page">
      {/* ======= Header Section ======= */}
      <div className="learn-header">
        <div className="learn-icon">
          <FaBookOpen size={26} />
        </div>
        <div>
          <h2>Learning Center</h2>
          <p>Educational resources about food allergies and sensitivities</p>
        </div>
      </div>

      {/* ======= Articles Grid ======= */}
      <div className="articles-grid">
        {/* Article 1 */}
        <div className="article-card">
          <div className="article-tag">Basics</div>
          <img
            src="https://mydiagnostics.in/cdn/shop/articles/Evidence-Based_1024x400_a311365d-229d-4c58-83b4-9b5b89a0410e_1024x1024.webp?v=1727888498"
            alt="Food Allergies"
            className="article-img"
          />
          <div className="article-content">
            <h3>Understanding Food Allergies: A Comprehensive Guide</h3>
            <p>
              Learn about the most common food allergens, symptoms, and how to
              manage allergic reactions effectively for a safer lifestyle.
            </p>
            <div className="article-footer">
              <span className="read-time">
                <FaClock /> 5 min read
              </span>
              <a href="https://acaai.org/allergies/allergic-conditions/food/" className="read-more">
                Read More →
              </a>
            </div>
          </div>
        </div>

        {/* Article 2 */}
        <div className="article-card">
          <div className="article-tag safety">Safety</div>
          <img
            src="https://www.fooddocs.com/hs-fs/hubfs/be%20aware%20of%20cross%20contamination-1.jpg"
            alt="Cross Contamination"
            className="article-img"
          />
          <div className="article-content">
            <h3>Cross-Contamination: What You Need to Know</h3>
            <p>
              Discover how cross-contamination occurs and simple steps you can
              take to prevent it while cooking and storing food safely.
            </p>
            <div className="article-footer">
              <span className="read-time">
                <FaClock /> 4 min read
              </span>
              <a href="https://www.healthline.com/nutrition/what-is-cross-contamination" className="read-more">
                Read More →
              </a>
            </div>
          </div>
        </div>

        {/* Article 3 */}
        <div className="article-card">
          <div className="article-tag">Health</div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB96XmBw19V_OFRL8c13tPsteyhEGI-B0XQ&s"
            alt="Allergy Symptoms"
            className="article-img"
          />
          <div className="article-content">
            <h3>Recognizing Early Signs of Food Allergies</h3>
            <p>
              Identifying allergic symptoms early can prevent severe reactions.
              Learn what to watch for and when to seek medical help.
            </p>
            <div className="article-footer">
              <span className="read-time">
                <FaClock /> 6 min read
              </span>
              <a href="https://www.mayoclinic.org/diseases-conditions/food-allergy/symptoms-causes/syc-20355095" className="read-more">
                Read More →
              </a>
            </div>
          </div>
        </div>

        {/* Article 4 */}
        <div className="article-card">
          <div className="article-tag">Nutrition</div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFx7tp8aPTgWguRGMI5MQed8OH4pO04rhhfw&s"
            alt="Allergy Friendly Foods"
            className="article-img"
          />
          <div className="article-content">
            <h3>Top Allergy-Friendly Foods for a Balanced Diet</h3>
            <p>
              Explore delicious and safe alternatives to common allergens like
              dairy, nuts, and gluten — without compromising on nutrition.
            </p>
            <div className="article-footer">
              <span className="read-time">
                <FaClock /> 5 min read
              </span>
              <a href="https://www.everydayhealth.com/food-allergies/list-of-hypoallergenic-foods/" className="read-more">
                Read More →
              </a>
            </div>
          </div>
        </div>

        {/* Article 5 */}
        <div className="article-card">
          <div className="article-tag safety">Tips</div>
          <img
            src="https://raise.theallergychef.com/wp-content/uploads/2022/07/Eating-out-at-Restaurants-with-CD-and-FA.jpg"
            alt="Restaurant Safety"
            className="article-img"
          />
          <div className="article-content">
            <h3>Dining Out Safely with Food Allergies</h3>
            <p>
              Eating at restaurants can be safe with the right precautions.
              Learn how to communicate your needs and avoid hidden allergens.
            </p>
            <div className="article-footer">
              <span className="read-time">
                <FaClock /> 4 min read
              </span>
              <a href="https://www.foodallergyawareness.org/living-with-food-allergies/dining-out/dining-out/" className="read-more">
                Read More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learn;


