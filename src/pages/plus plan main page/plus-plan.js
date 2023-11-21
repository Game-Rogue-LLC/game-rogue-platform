import './plus-plan.css';
import './script';

const PlusPlan = () => {
  return (


<main class="main flow">
  <h1 class="main__heading">PLUS PLANS</h1>
  <div class="main__cards cards">
    <div class="cards__inner">
      <div class="cards__card card">
        <h2 class="card__heading">Player +</h2>
        <p class="card__price">$7.99</p>
        <ul role="list" class="card__bullets flow">
          <li>100+ Custom Player Graphics</li>
          <li>25+ Custom Player Animations</li>
          <li>EoT AI Video Editor</li>
          <li>EoT AI Marketing Assistant</li>
          <li>Stream Promotions</li>
          <li>Player Plus Badge</li>
          <li>GIF Background</li>
          <li>Find Teams</li>
        </ul>
        <a href="#basic" class="card__cta cta">Learn More</a>
      </div>

      <div class="cards__card card">
        <h2 class="card__heading">Team +</h2>
        <p class="card__price">$14.99</p>
        <ul role="list" class="card__bullets flow">
          <li>100+ Custom Team Graphics</li>
          <li>25+ Custom Team Animations</li>
          <li>Unlimited Scouting Reports</li>
          <li>EoT AI Video Editor</li>
          <li>EoT AI Marketing Assistant</li>
          <li>GIF Background</li>
          <li>Team Plus Badge</li>
          <li>Find Players</li>
          <li>Find Staff</li>
        </ul>
        <a href="#pro" class="card__cta cta">Learn More</a>
      </div>

      <div class="cards__card card">
        <h2 class="card__heading">Organizer +</h2>
        <p class="card__price">$99.99</p>
        <ul role="list" class="card__bullets flow">
          <li>100+ Custom Organizer Graphics</li>
          <li>25+ Custom Organizer Animations</li>
          <li>EoT AI Video Editor</li>
          <li>EoT AI Marketing Assistant</li>
          <li>EoT AI Article Creator</li>
          <li>Auto Commentator Booklets</li>
          <li>Organizer Plus Badge</li>
          <li>GIF Background</li>
          <li>Find Productions</li>
          <li>Find Staff</li>
          <li>Find Teams</li>
        </ul>
        <a href="#ultimate" class="card__cta cta">Learn More</a>
      </div>
    </div>
    
    <div class="overlay cards__inner"></div>
  </div>
</main>

  )
}
export default PlusPlan;