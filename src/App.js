import React, { Component } from 'react';
import celebration from './assets/images/celebration.svg';
import user from './assets/images/user.svg';
import './styles/Bootstrap.css';
import './styles/App.css';
import Harnimated from './components/Animated';
import html2canvas from 'html2canvas';
import { FormValidation } from "calidation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      image: null,
      changeSecond: false,
      member: null,
      loadTicket: false,
      loadingTicket: false,
      canvasUrl: null,
    }
    this.handlePhoto = this.handlePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showTicket = this.showTicket.bind(this);
    this.createImage = this.createImage.bind(this);
  }


  handlePhoto(e) {
    this.setState({ uploading: true });
    let files = e.target.files || e.dataTransfer.files;
    if(!files.length)
        return

    this.createImage(files[0]);
  }

  createImage(file) {
    console.log('Touched Create Imagee');
    let reader = new FileReader();
    reader.onload = (e) => {
        console.log('Setting Image');
        this.setState({image: e.target.result});
        console.log(e.target.result);
    }
    reader.readAsDataURL(file);

    setTimeout(() => {
        html2canvas(document.querySelector("#capture")).then(canvas => {
         this.setState({ canvasUrl: canvas.toDataURL('image.png',1)})
        });
    },500)
    
  }

  onSubmit({ fields, errors, isValid }) {
    if(isValid) {
      console.log(fields);
      this.setState({
        changeSecond: true,
        member: {
          name: fields.fullname,
          job: fields.jobdesc
        }
      });
      this.showTicket();
    }else {
      console.log(errors);
    }
  }

  showTicket() {
    this.setState({
      loadTicket: true,
      loadingTicket: true,
    });
    setTimeout(() => {
      
    }, 3000);
  }


  render() {
    const config = {
      fullname: {
        isRequired: "Please Enter Your Name",
      },
      jobdesc: {
        isRequired: "Please Enter Your Role in Church. e.g Member",
      },
      myfile: {
        isRequired: "Please Select a Photo"
      }
    };
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="width-50 faded">
            <h1 className="text-center">RCCG THRONE OF GRACE</h1>
            <h3 style={{ color: '#f99f8d'}} className="text-center">Taking Over Generation</h3>
            <div className="row justify-content-center">
              <div className="col-md-9" style={{ }}>
              
                <div style={{ backgroundColor: `rgba(255,255,255,0.4)`, height: 'auto', padding: '1em', marginTop: '1em', borderRadius: '.3em'}}>
                  <p>Spread the Word</p>
                  <FormValidation config={config} onSubmit={this.onSubmit}>
                  {({ fields, errors, submitted }) => (
                    <React.Fragment>
                      <div className="form-group">
                        <label className='text-left'>Fullname</label>
                        <input type="text" className="form-control" name="fullname" />
                        {submitted && errors.fullname &&
                          <div className="help-text text-danger">{errors.fullname}</div>
                        }
                      </div>
                      <div className="form-group">
                        <label className='text-left'>Job Description</label>
                        <input type="text" className="form-control" name="jobdesc" />
                        {submitted && errors.jobdesc &&
                          <div className="help-text text-danger">{errors.jobdesc}</div>
                        }
                      </div>
                      <div className="form-group">
                        <label>Upload Your Photo</label>
                        <div class="upload-btn-wrapper">
                          <button class="upload-btn btn btn-block">Select a Photo</button>
                          <input type="file" name="myfile" onChange={this.handlePhoto} />
                          {submitted && errors.myfile &&
                          <div className="help-text text-danger">{errors.myfile}</div>
                        }
                        </div>
                      </div>
                      <div className="form-group">
                        <button className="btn btn-secondary btn-block">Submit</button>
                      </div>
                    </React.Fragment>
                  )}
                  </FormValidation>
                </div>
              </div>
            </div>
          </div>
          
          <div className="width-50 extra-padding text-center" id="capture">
            
            {this.state.changeSecond &&
              <React.Fragment>
                <div className="row justify-content-center">
                  <div className="col-md-10">
                  <div className="ticket justify-content-center">
                    <h1 style={{ padding: '0.5rem 0 0 0', color: '#fafafa' }}>RCCG Throne of Grace</h1>
                    <h4 style={{ color: '#91DC5A'}}>(Area 35 LP 44)</h4>
                    <h3>I am a Member</h3>
                    <center>
                      <div class="ticket-img text-center">
                        <img src={this.state.image} width={150} className="img-fluid" />
                      </div>

                    {/* {this.state.member.name ? this.state.member.name : 'Unknown Nameissolong'}<br />
                    {this.state.member.job} */}
                    </center>
                    <h2>{this.state.member.name}</h2>
                    <h3 style={{ color: '#f99f8d' }}>
                    {this.state.member.job}
                    </h3>

                    <p style={{ marginTop: '2em'}}>
                      <b>Watch-Out for new TOG New Address: </b>
                    </p>
                    <p>
                    <span style={{ color: '#91dc5a' }}>
                      No 00, Nnobi Street, Kilo Bus-Stop, Surulere, Lagos
                    </span>
                    </p>
                    <p>
  
                    <span style={{ color: '#f99f8d'}}>#TakeOverGeneration</span>
                  </p>
                  </div>
                  <div class="addthis_inline_share_toolbox"></div>
                </div>
                <a class="btn btn-block btn-secondary" id="download" href={this.state.canvasUrl}>Save Image</a>
                </div>
              </React.Fragment>
            
            }
            {!this.state.changeSecond &&
              <React.Fragment>
              <img src={celebration} className="img-fluid" />
              <div className="py-4">
                <h2 style={{ color: '#473A43', fontSize: '2em'}}>RCCG</h2>
                <h2 style={{ color: '#473A43',}}>Throne of Grace Inauguration</h2>
                <h5 style={{ color: '#473A43',}}>Dec. 16, 2018</h5>
              </div>
              </React.Fragment>
              }
          </div>
        </div>
      </React.Fragment>

    );
  }
}

export default App;
