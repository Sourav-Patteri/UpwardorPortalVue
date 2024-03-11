<template>
    <form id="quote-form">
    <div className="question">
      <label htmlFor="number-of-doors">Number of doors:</label>
      <div className="answer">
        <input type="number" id="number-of-doors" name="number-of-doors" min="1" max="1000" defaultValue="1" required />
        <p id="number-of-doors-validation" className="validation-message"></p>
      </div>
    </div>

    <div className="question" id="bulk-panels">
      <label htmlFor="bulk-panels">Panels Only(Bulk)</label>
      <div className="answer">
        <label><input type="radio" name="bulk-panels" value="yes" /> Yes</label>
        <label><input type="radio" name="bulk-panels" value="no" defaultChecked /> No</label>
      </div>
    </div>

    <div className="question">
      <label htmlFor="door-width">Door width:</label>
      <div className="answer">
        <select id="door-width" required>
          <option value="08'">08'</option>
          <option value="09'">09'</option>
          <option value="10'">10'</option>
          <option value="12'">12'</option>
          <option value="14'">14'</option>
          <option value="16'">16'</option>
          <option value="18'">18'</option>
        </select>
      </div>
    </div>

    <div className="question">
      <label htmlFor="door-height">Door height:</label>
      <div className="answer">
        <select id="door-height" required>
          <option value="06'0">06'0"</option>
          <option value="06'3">06'3"</option>
          <option value="06'6">06'6"</option>
          <option value="06'9">06'9"</option>
          <option value="07'0">07'0"</option>
          <option value="07'3">07'3"</option>
          <option value="07'6">07'6"</option>
          <option value="07'9">07'9"</option>
          <option value="08'0">08'0"</option>
          <option value="08'3">08'3"</option>
          <option value="08'6">08'6"</option>
          <option value="08'9">08'9"</option>
          <option value="09'0">09'0"</option>
          <option value="09'3">09'3"</option>
          <option value="09'6">09'6"</option>
          <option value="09'9">09'9"</option>
          <option value="10'0">10'0"</option>
          <option value="10'3">10'3"</option>
          <option value="10'6">10'6"</option>
          <option value="10'9">10'9"</option>
          <option value="11'0">11'0"</option>
          <option value="11'3">11'3"</option>
          <option value="11'6">11'6"</option>
          <option value="11'9">11'9"</option>
          <option value="12'0">12'0"</option>
        </select>
      </div>
    </div>

    <div className="question">
<label htmlFor="stamp-pattern">Stamp Pattern:</label>
<div className="answer">
  <select id="stamp-pattern">
    <option value="FLUSH">Flush</option>
    <option value="TRAFALGAR">Trafalgar</option>
    <option value="BC">Bronte Creek</option>
    <option value="BCXL">Bronte Creek XL</option>
    <option value="SH">Sheridan</option>
    <option value="SHXL">Sheridan XL</option>
  </select>
</div>
</div>

<div className="question">
<label htmlFor="panel-color">Panel Color:</label>
<div className="answer">
  <select id="panel-color">
    <option value="WHITE">WHITE</option>
    <option value="SANDTONE">SANDTONE</option>
    <option value="BLACK">BLACK</option>
    <option value="BRONZE">BRONZE</option>
    <option value="NEW BROWN">NEW BROWN</option>
    <option value="STEEL GREY">STEEL GREY</option>
    <option value="NEW ALMOND">NEW ALMOND</option>
    <option value="WALNUT">WALNUT</option>
  </select>
</div>
</div>

<div id="hidden-questions-container">
<div className="question">
  <label htmlFor="has-windows">Windows</label>
  <div className="answer">
    <select id="has-windows">
      <option value="yes">Yes</option>
      <option value="no">No</option>
      <option value="vertical">Vertical Configuration</option>
    </select>
  </div>
</div>

<div id="window-questions-container">
<div className="question">
<label htmlFor="frame-size">Frame Size:</label>
<div className="answer">
  <select id="frame-size">
    <option value="short">Short</option>
    <option value="long">Long</option>
  </select>
</div>
</div>

<div className="question">
<label htmlFor="glazing-type">Glazing Type:</label>
<div className="answer">
  <select id="glazing-type">
    <option value="5">NO GLASS</option>
    <option value="2">THERM - CLEAR/ CLEAR</option>
    <option value="1">SINGLE - CLEAR/ CLEAR</option>
    <option value="4">THERM - ACID ETCHED</option>
  </select>
</div>
</div>

<div className="question">
<label htmlFor="insert-type">Insert Type:</label>
<div className="answer">
  <select id="insert-type">
    <option value="00">No Insert</option>
    <option value="02">CASCADE</option>
    <option value="06">STOCKTON</option>
    <option value="10">ARCHED STOCKBRIDGE</option>
    <option value="11">ARCHED STOCKTON</option>
    <option value="12">STRAIGHT STOCKBRIDGE</option>
    <option value="13">WATERTON</option>
  </select>
</div>
</div>
</div>


<div className="question">
<label htmlFor="add-tracks">Tracks</label>
<div className="answer">
  <label><input type="radio" name="add-tracks" value="yes" defaultChecked/> Yes</label>
  <label><input type="radio" name="add-tracks" value="no"/> No</label>
</div>
</div>

<div id="track-questions-container">
<div className="question">
<label htmlFor="track-radius">Track Radius:</label>
<div className="answer">
  <select id="track-radius">
    <option value="12">12</option>
    <option value="15">15</option>
  </select>
</div>
</div>

<div className="question">
<label htmlFor="track-type">Track Type:</label>
<div className="answer">
  <select id="track-type">
    <option value="standard-lift-bracket">STANDARD LIFT BRACKET MOUNT</option>
    <option value="standard-lift-angle">STANDARD LIFT ANGLE MOUNT</option>
    <option value="standard-lift-long-angle">STANDARD LIFT LONG ANGLE</option>
    <option value="vertical-lift-bracket">VERTICAL LIFT BRACKET MOUNT</option>
    <option value="vertical-lift-angle">VERTICAL LIFT ANGLE MOUNT</option>
  </select>
</div>
</div>

<div className="question">
<label htmlFor="special-track-request">Special Track Request</label>
<div className="answer">
  <select id="special-track-request">
    <option value="no">No</option>
    <option value="high-lift-kits">HIGH LIFT KITS</option>
    <option value="low-head-room-kits">LOW HEAD ROOM KITS</option>
  </select>
</div>
</div>

<div className="question">
<label htmlFor="extension-height">Enter Extension Height(ft):</label>
<div className="answer">
  <input type="number" id="extension-height" min="1" max="15" />
</div>
</div>
</div>

<div className="question">
<label htmlFor="shafts">Shafts</label>
<div className="answer">
  <label><input type="radio" name="shafts" value="yes" defaultChecked/> Yes</label>
  <label><input type="radio" name="shafts" value="no"/> No</label>
</div>
</div>

<div className="question">
<label htmlFor="add-springs">Springs</label>
<div className="answer">
  <label><input type="radio" name="add-springs" value="yes" defaultChecked/> Yes</label>
  <label><input type="radio" name="add-springs" value="no" /> No</label>
</div>
</div>

<div className="question">
<label htmlFor="struts">Struts</label>
<div className="answer">
  <label><input type="radio" name="struts" value="yes" defaultChecked/> Yes</label>
  <label><input type="radio" name="struts" value="no" /> No</label>
</div>
</div>

<div className="question">
<label htmlFor="hardware-kits">Hardware Kits</label>
<div className="answer">
  <label><input type="radio" name="hardware-kits" value="yes" defaultChecked/> Yes</label>
  <label><input type="radio" name="hardware-kits" value="no" /> No</label>
</div>
</div>
<div className="question">
<label htmlFor="weather-stripping">Weather Stripping</label>
<div className="answer">
  <label><input type="radio" name="weather-stripping" value="yes" defaultChecked/> Yes</label>
  <label><input type="radio" name="weather-stripping" value="no" /> No</label>
</div>
</div>

<div className="question">
<label htmlFor="decorative-hardware">Decorative Hardware Parts</label>
<div className="answer">
  <label><input type="radio" name="decorative-hardware" value="yes" defaultChecked/> Yes</label>
  <label><input type="radio" name="decorative-hardware" value="no" /> No</label>
</div>
</div>

<div className="question">
<label htmlFor="astragal-bottom-retainer">Astragal and Bottom Retainer</label>
<div className="answer">
  <label><input type="radio" name="astragal-bottom-retainer" value="yes" defaultChecked/> Yes</label>
  <label><input type="radio" name="astragal-bottom-retainer" value="no"/> No</label>
</div>
</div>

</div>
    <button type="submit" onClick={onSubmit}>Generate Quote</button>
  </form>
</template>

<script>
export default {
};
</script>

<style scoped>

</style>
