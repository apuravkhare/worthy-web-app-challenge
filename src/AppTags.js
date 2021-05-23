import React, {Component} from 'react';
import { TagsDef } from './models/TagsDef';
import { Chip } from "@progress/kendo-react-buttons";

export class AppTag extends Component {
  constructor(props) {
    super(props);

    this.state = { allTags: props.tagsToRender || [], onToggle: props.onToggle, disableToggle: props.disableToggle, toggleSelectHandler: props.onToggleSelect };
  }

  componentDidMount() {
    if (this.state.allTags && this.state.allTags.length > 0) {
      this.setState({ allTags: this.state.allTags.map(item => { return { text: item, isSelected: true }; }) });
    } else {
      var tagsDef = new TagsDef();
      tagsDef.getAllTags((data => this.setState({ allTags: data.map(item => { return { text: item, isSelected: false }; }) })));
    }
  }

  toggleSelect(event, tag) {
    tag.isSelected = !tag.isSelected;
    this.setState({ allTags: this.state.allTags });
    
    if (this.state.toggleSelectHandler) {
      this.state.toggleSelectHandler(this.state.allTags);
    }
  }

  renderTags = () => {
    return this.state.allTags.map((tag, index) => 
    (<Chip
      key={index}
      onClick={(event) => this.state.disableToggle ? false : this.toggleSelect(event, tag)}
      look={tag.isSelected ? "filled" : "outlined"}
      className="m-1"
      text={tag.text}
     />
    ));
  }

  render() {
    return(
      <div className="border border-light rounded">
          {this.renderTags()}
      </div>
    );
  }
}