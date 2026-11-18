import { reviews } from "../../content.js";

export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="wrap reviews-layout">
        <div className="section-title">
          <h2>What Our<br />Customers Say</h2>
          <p>Trusted by homeowners and businesses across Karachi.</p>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review" key={review.name}>
              <div className="stars">★★★★★</div>
              <p>“{review.quote}”</p>
              <b>{review.name}</b><small>{review.meta}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
