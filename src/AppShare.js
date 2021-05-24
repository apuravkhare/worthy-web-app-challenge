import React, {Component} from 'react';
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input, TextArea } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";
import { AppNav } from './AppNav';
import { Container, Row, Col } from 'react-bootstrap';
import { isUri } from 'valid-url';
import { ReactTinyLink } from 'react-tiny-link';
import { AppTag } from './AppTags';
import AppConfig from './AppConfig';
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export class AppShare extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedInUserId: props.loggedInUserId, currentUrl: "", selectedTags: [], showSuccessPopup: false }
  }

  handleSubmit = (formData) => {
    // var newMedia = new Media(null, null, this.state.loggedInUserId, formData.media.title, formData.media.caption, formData.media.url, this.state.selectedTags);

    var newMedia = {
      "Id": 0,
      "Type": 0,
      "UserId": this.state.loggedInUserId,
      "Title": formData.media.title,
      "Caption": formData.media.caption,
      "Url": formData.media.url,
      "Tags": this.state.selectedTags
    }

    if (AppConfig.useApi) {
      fetch(AppConfig.apiUrl + "/Share", {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type':'application/json'},
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(newMedia)
      }).then((result) => {
        // Display success
        // window.location('/Discover');
        this.setState({showSuccessPopup: true});
      });
    }

    return true;
  }

  onDialogClose = () => {
    this.setState({showSuccessPopup: false});
    window.location = "/Discover";
  }

  showSuccess = () => {
    return (
      <div>
        <Dialog title={"Delete Data"} onClose={this.onDialogClose}>
          <div>
            <p>Media shared successfully!</p>
          </div>
          <DialogActionsBar>
            <button className="k-button k-primary" onClick={this.onDialogClose}>
              Done
            </button>
          </DialogActionsBar>
        </Dialog>
      </div>
    );
  }

  validatedInput = (fieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
      <div>
        <Input {...others} />
        {visited && validationMessage && <Error>{validationMessage}</Error>}
      </div>
    );
  };

  textAreaField = (fieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
      <div>
        <TextArea rows={3} placeholder="Tell us what you love about the media you're sharing" {...others} />
      </div>
    );
  }

  handleTagsToggle = (allTags) => {
    var filteredTags = allTags.filter(tag => tag.isSelected).map(tag => tag.text);
    this.setState({ selectedTags: filteredTags });
  }

  tagsField = (fieldRenderProps) => {
    return (
      <div>
        <p style={{textAlign: "left"}}>Choose one or more categories:</p>
        <AppTag onToggleSelect={this.handleTagsToggle}></AppTag>
      </div>
    );
  }

  validateUri = (value) => {
    return isUri(value) ? "" : "Please enter a valid URL";
  };

  validateNullOrEmpty = (value) => {
    return value && value.length > 0 ? "" : "Please enter a Title";
  };

  handleUrlChange = (target) => {
    this.setState({ loggedInUserId: this.state.loggedInUserId, currentUrl: target ? target.value : "" });
  }

  render() {
    return (
      <Container className="h-100">
        <Row style={{height: "20%"}}>
        <AppNav renderHome={true} renderDiscover={true} />
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form 
              onSubmit={this.handleSubmit}
              // validator={firstOrLastNameValidator}
              render={(formRenderProps) => (
                <FormElement style={{ maxWidth: 650 }}>
                  <fieldset className={"k-form-fieldset"}>
                    <legend className={"k-form-legend"}>
                      What would you like to share today
                    </legend>
                    {formRenderProps.visited &&
                      formRenderProps.errors &&
                      formRenderProps.errors.VALIDATION_SUMMARY && (
                        <div className={"k-messagebox k-messagebox-error"}>
                          {formRenderProps.errors.VALIDATION_SUMMARY}
                        </div>
                      )}
                    <div className="mb-3">
                      <Field
                        name={"media.url"}
                        component={this.validatedInput}
                        label={"Media URL"}
                        validator={this.validateUri}
                        onChange={this.handleUrlChange}
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name={"media.title"}
                        component={this.validatedInput}
                        label={"Title"}
                        validator={this.validateNullOrEmpty}
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name={"media.caption"}
                        component={this.textAreaField}
                        label={"Caption"}
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name={"media.tags"}
                        component={this.tagsField}
                      />
                    </div>
                  </fieldset>
                  <div className="k-form-buttons">
                    <button
                      type={"submit"}
                      className="btn btn-secondary btn-md"
                      disabled={!formRenderProps.allowSubmit}
                    >
                      Share
                    </button>
                  </div>
                </FormElement>
              )}
            />
            {this.state.showSuccessPopup && this.showSuccess()}
          </Col>
          <Col xs={12} md={6}>
            <h5>Preview</h5>
            {this.renderPreview()}
          </Col>
        </Row>
      </Container>
    );
  }

  renderPreview() {
    if (this.state.currentUrl && isUri(this.state.currentUrl)) {
      return (
        <div className="mt-4">
          <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={this.state.currentUrl}
          />
        </div>
      );
    } else {
      return (<p className="text-info">Enter a media URL to see its preview</p>);
    }
  }
}