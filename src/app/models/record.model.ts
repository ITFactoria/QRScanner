import { stringify } from 'querystring';

export class Record {
    format: string;
    text: string;
    type: string;
    icon: string
    created : Date;

    constructor(format: string, text: string) {
        this.format = format;
        this.text = text;
        this.setupTypeIcon();
        this.created = new Date();

    }

    private setFormat(format: string){
        this.format = format;
    }

    private setupTypeIcon() {
        let subFormat: string;
        subFormat = this.format.substr(0, 4);

        switch (subFormat) {
            case 'http': {
                this.type = 'http';
                this.icon = 'globe-outline';
                break;
            }
            case 'geo': {
                this.type = 'geo';
                this.icon = 'location-outline';
                break;
            }
            default: {
                this.type = 'err';
                this.icon = 'bug-outline';
                break;
            }
        }
    }
}

