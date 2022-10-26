import React from 'react'

export default function Adminform() {
  return (
    <main className="app-content">
    <div className="app-title">
      <div>
        <h1><i className="fa fa-edit"></i> Form Components</h1>
        <p>Bootstrap default form components</p>
      </div>
      <ul className="app-breadcrumb breadcrumb">
        <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
        <li className="breadcrumb-item">Forms</li>
        <li className="breadcrumb-item"><a href="#">Form Components</a></li>
      </ul>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="tile">
          <div className="row">
            <div className="col-lg-6">
              <form>
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input className="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="Enter email"/><small className="form-text text-muted" id="emailHelp">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input className="form-control" id="exampleInputPassword1" type="password" placeholder="Password"/>
                </div>
                <div className="form-group">
                  <label for="exampleSelect1">Example select</label>
                  <select className="form-control" id="exampleSelect1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="form-group">
                  <label for="exampleSelect2">Example multiple select</label>
                  <select className="form-control" id="exampleSelect2" multiple="">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="form-group">
                  <label for="exampleTextarea">Example textarea</label>
                  <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
                </div>
                <div className="form-group">
                  <label for="exampleInputFile">File input</label>
                  <input className="form-control-file" id="exampleInputFile" type="file" aria-describedby="fileHelp"/><small className="form-text text-muted" id="fileHelp">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                </div>
                <fieldset className="form-group">
                  <legend>Radio buttons</legend>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" id="optionsRadios1" type="radio" name="optionsRadios" value="option1" checked=""/>Option one is this and that—be sure to include why it's great
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" id="optionsRadios2" type="radio" name="optionsRadios" value="option2"/>Option two can be something else and selecting it will deselect option one
                    </label>
                  </div>
                  <div className="form-check disabled">
                    <label className="form-check-label">
                      <input className="form-check-input" id="optionsRadios3" type="radio" name="optionsRadios" value="option3" disabled=""/>Option three is disabled
                    </label>
                  </div>
                </fieldset>
                <div className="form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" type="checkbox"/>Check me out
                  </label>
                </div>
              </form>
            </div>
            <div className="col-lg-4 offset-lg-1">
              <form>
                <div className="form-group">
                  <fieldset disabled="">
                    <label className="control-label" for="disabledInput">Disabled input</label>
                    <input className="form-control" id="disabledInput" type="text" placeholder="Disabled input here..." disabled=""/>
                  </fieldset>
                </div>
                <div className="form-group">
                  <fieldset>
                    <label className="control-label" for="readOnlyInput">Readonly input</label>
                    <input className="form-control" id="readOnlyInput" type="text" placeholder="Readonly input here…" readonly=""/>
                  </fieldset>
                </div>
                <div className="form-group has-success">
                  <label className="form-control-label" for="inputSuccess1">Valid input</label>
                  <input className="form-control is-valid" id="inputValid" type="text"/>
                  <div className="form-control-feedback">Success! You've done it.</div>
                </div>
                <div className="form-group has-danger">
                  <label className="form-control-label" for="inputDanger1">Invalid input</label>
                  <input className="form-control is-invalid" id="inputInvalid" type="text"/>
                  <div className="form-control-feedback">Sorry, that username's taken. Try another?</div>
                </div>
                <div className="form-group">
                  <label className="col-form-label col-form-label-lg" for="inputLarge">Large input</label>
                  <input className="form-control form-control-lg" id="inputLarge" type="text"/>
                </div>
                <div className="form-group">
                  <label className="col-form-label" for="inputDefault">Default input</label>
                  <input className="form-control" id="inputDefault" type="text"/>
                </div>
                <div className="form-group">
                  <label className="col-form-label col-form-label-sm" for="inputSmall">Small input</label>
                  <input className="form-control form-control-sm" id="inputSmall" type="text"/>
                </div>
                <div className="form-group">
                  <label className="control-label">Input addons</label>
                  <div className="form-group">
                    <label className="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
                    <div className="input-group">
                      <div className="input-group-prepend"><span className="input-group-text">$</span></div>
                      <input className="form-control" id="exampleInputAmount" type="text" placeholder="Amount"/>
                      <div className="input-group-append"><span className="input-group-text">.00</span></div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="tile-footer">
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </main>
  )
}
