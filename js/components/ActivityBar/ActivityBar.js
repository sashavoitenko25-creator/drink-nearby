class ActivityBar {

    constructor(parent){

        this.parent = parent;

        this.activities = [

            {
                emoji:"🍺",
                title:"Випити"
            },

            {
                emoji:"☕",
                title:"Кава"
            },

            {
                emoji:"🚶",
                title:"Прогулянка"
            },

            {
                emoji:"💬",
                title:"Спілкування"
            }

        ];

    }

    render(){

        this.element=document.createElement("div");

        this.element.className="activity-bar";

        this.activities.forEach((activity,index)=>{

            const item=document.createElement("div");

            item.className="activity-item";

            if(index===0){

                item.classList.add("active");

            }

            item.innerHTML=`

                <span class="emoji">${activity.emoji}</span>

                <span>${activity.title}</span>

            `;

            item.onclick=()=>{

                this.element
                    .querySelectorAll(".activity-item")
                    .forEach(el=>el.classList.remove("active"));

                item.classList.add("active");

            };

            this.element.appendChild(item);

        });

        this.parent.appendChild(this.element);

    }

}
export default ActivityBar;