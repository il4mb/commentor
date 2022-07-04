/* commentor js ver 1 - copyright by ilhamb */
class Commentor {
    constructor(data = {wrapper: null, data: [], id: null, icons: null, maxLength: 250, minLength: 50})
    {
        let type = typeof data.wrapper;
        switch (type) {
            case "string":
                if (document.getElementById(data.wrapper)) {
                    data = render(document.getElementById(data.wrapper), data.icons, data.data, data.maxLength, data.minLength);
                    this.Prototype();
                } else {
                    console.error("%c（；￣ェ￣）",
                                  "color: red; background-color: white;padding: 2px; border-radius: 100px",
                                  "ERROR: wrapper id not found");
                    return false;
                }
                break;
            case "object":
                data = render(data.wrapper, data.icons, data.data, data.maxLength, data.minLength);
                this.Prototype();
                break;
            default:
                console.error("%c（；￣ェ￣）",
                              "color: red; background-color: white;padding: 2px; border-radius: 100px",
                              "ERROR: wrapper type not recognized");
                break;
        }
        this.onSave = (e) => {
            data.onSave(e);
        };
        this.setContentID = (e) => {
            data.setContentID(e);
        };
        this.setOption = (e) => {
            data.option({Max: e.Max, Min: e.Min, illegalString: e.Exception});
        };
        this.setComments = (e) => {
            data.create(e);
        };
        this.setUser = (e) => {
            // e = { name: value, email: value }
            data.setUser(e);
        };
        this.setTitle = E => {
            data.setTitle(E);
        };
        this.countDown = E => {
            data.countDown(E);
        };   
    }
}
    
function render(wrapper, icons, data, Min, Max)
{
    let textareaManeger = TextareaManeger(), bootVerify = verify(), textarea, heading, Commbody, iconWrap, nameInput, emailInput, countDown = 30, timming, isNew = false, onSave, submitBTN, contentID = null, comments;
    let div = ELEMENT('div',
                {
                  attr: {class: '_cmm-wrapper'},
                  inner: [
                      ELEMENT('div', {
                              attr: {class: "_cmm_head"},
                              inner: [
                                ELEMENT('h2',{
                                    attr: {class: "_cmm_brand"},
                                    inner: "COMMENTOR JS",
                                    todo: E => {
                                        heading = E;
                                    }
                                })
                              ]
                          }),
                      ELEMENT('div', {
                              attr: {class: '_cmm_body'},
                              todo: E => { Commbody = E; },
                              inner: [
                                  ELEMENT('div', {
                                    attr: { class:'_cmm_form' },
                                    inner: [
                                        ELEMENT('div', {
                                            attr: {class: '_cmm_group'},
                                            inner: [
                                                ELEMENT('textarea', {
                                                    attr: {
                                                        class: '_cmm_input_large',
                                                        placeholder: 'type here...',
                                                        contenteditable: 'true'
                                                    },
                                                    todo: e => {
                                                        textarea = e;
                                                        textareaManeger.setElement(e);
                                                    }
                                                }),
                             /*====================== ICON LAYOUT ===========================*/
                                                ELEMENT('div',{
                                                    attr: {
                                                        class: '_cmm_icons_wrapp'
                                                    },
                                                    todo: E => {
                                                        iconWrap = E;
                                                    },
                                                    inner: [
                                                        ELEMENT("div", {
                                                            attr: {class: "_cmm_shadow shadow--top"}
                                                        }),
                                                        ELEMENT("div", {
                                                            attr: {class: "_cmm_shadow shadow--bottom"}
                                                        }),

                                                        ELEMENT("div", {
                                                            attr: {class: "_cmm_icon_group"},
                                                            todo: (a) => {
                                                                if (icons && icons.length > 0) {
                                                                    icons.forEach( e => {
                                                                        a.append(ELEMENT('span', {
                                                                            attr: { class: "_cmm_icon" },
                                                                            inner: e,
                                                                            todo: (z) => {
                                                                                z.addEventListener('click', () => {
                                                                                    textareaManeger.focus();
                                                                                    textareaManeger.insertAtCaret(e);
                                                                                });
                                                                            }
                                                                        }));
                                                                    });
                                                                } else {
                                                                    a.classList.add('__empty');
                                                                }

                                                                a.addEventListener('scroll', () => {
                                                                let shadowTop = a.parentElement.querySelector(".shadow--top"),
                                                                    shadowBottom = a.parentElement.querySelector(".shadow--bottom");

                                                                    var currentScroll = a.scrollTop - a.offsetHeight;
                                                                    shadowTop.style.opacity = currentScroll;
                                                                    shadowBottom.style.opacity = 1 - currentScroll;
                                                                });
                                                            }
                                                        })
                                                    ]
                                                }),
                          /* ===================== FORM INPUT ====================== */
                                                ELEMENT("div", {
                                                    attr: {
                                                        class: '_cmm_group'
                                                    },
                                                    inner: [
                                                        ELEMENT('small', {
                                                            inner: "Enter the name to be displayed"
                                                        }),
                                                        ELEMENT('input', {
                                                            attr: {
                                                                class: '_cmm_input_small',
                                                                placeholder: 'enter your name',
                                                                contenteditable: 'true'
                                                            },
                                                            todo: (e) => {
                                                                e.onInput(5, 20, /[^A-Z\s]/gi);
                                                                nameInput = e;
                                                            }
                                                        }),
                                                        ELEMENT('small', {
                                                            inner: "Your email address will not be shared"
                                                        }),
                                                        ELEMENT('input', {
                                                            attr: {
                                                                class: '_cmm_input_small',
                                                                placeholder: 'enter your e-mail',
                                                                contenteditable: 'true'
                                                            },
                                                            todo: (e) => {
                                                                e.onInput(0, 52, /[^a-z0-9\_\-\@\.]/i);
                                                                emailInput = e;
                                                            }
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        ELEMENT("div", {
                                            attr: {class: "_comm_bot_verify_wrapper"},
                                            inner: [
                                                ELEMENT("div", {
                                                    attr: {class: "_verify_content"},
                                                    inner: [
                                                        ELEMENT("canvas", {
                                                            todo: E => { bootVerify.setCanvas(E); }
                                                        }),
                                                        ELEMENT("input", {
                                                            todo: E => { bootVerify.setInput(E); }
                                                        }),
                                                        ELEMENT("span", {
                                                            todo: E => {
                                                                E.onclick = () => bootVerify.reload(E);
                                                            }
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        ELEMENT('div', {
                                            attr: {
                                                class: '_cmm_form_bottom'
                                            },
                                            inner: [
                                                ELEMENT('button', {
                                                    attr: {class: '_cmm_btn _cmm_submit'},
                                                    inner: "comment",
                                                    todo: (e) => {
                                                        submitBTN = e;
                                                        e.addEventListener("click", () => {
                                                            
                                                            if (nameInput.value.length < 5) {
                                                                onSave("ERROR: the number of character names must be more than 4");
                                                                return false;
                                                            }
                                                            if (emailInput.value.length < 0) {
                                                                onSave("ERROR: the number of email characters must be more than " + 0);
                                                                return false;
                                                            }
                                                            if (textareaManeger.getValue().length < Min) {
                                                                onSave("ERROR: the number of comment characters must be more than  "+Min);
                                                                return false;
                                                            }
                                                            if (textareaManeger.getValue().length > Max) {
                                                                onSave("ERROR: the number of comment characters exceeds the maximum "+Max);
                                                                return false;
                                                            }
                                                            if (! bootVerify.isTrue()) {
                                                                onSave(false);
                                                                return false;
                                                            }
                                                            
                                                            let data = {
                                                                user: {
                                                                    name: nameInput.value,
                                                                    email: emailInput.value
                                                                },
                                                                text: textareaManeger.getValue(),
                                                                id : contentID
                                                            };
                                                            textarea.value = "";
                                                            nameInput.value = "";
                                                            emailInput.value = "";
                                                            isNew = true;
                                                            onSave(data);
                                                            e.setAttribute('disabled', true);
                                                            e.setAttribute('disabled-util', countDown);
                                                            let saveCountDown = countDown;
                                                            clearInterval(timming);
                                                            timming = setInterval(()=>{
                                                                countDown--;
                                                                e.setAttribute('disabled-util', countDown);
                                                                if (countDown == 0) {
                                                                    countDown = saveCountDown;
                                                                    clearInterval(timming);
                                                                    e.removeAttribute('disabled');
                                                                }
                                                            }, 1000);
                                                        });
                                                    }
                                                })
                                            ]
                                        })
                                    ]
                                  })
                              ]
                          }),
                      ELEMENT('div', {
                        attr: {
                            class: "_cmm_comments_wrapper"
                        },
                        inner: [
                            ELEMENT("div", {
                                attr: {class: "_cmm_shadow shadow--top"}
                            }),
                            ELEMENT("div", {
                                attr: {class: "_cmm_shadow shadow--bottom"}
                            }),
                            ELEMENT('div', {
                                attr: {class: "_cmm_comments_list"},
                                todo: E => {
                                    comments = E;
                                    E.addEventListener('scroll', () => {
                                    let shadowTop = E.parentElement.querySelector(".shadow--top"),
                                        shadowBottom = E.parentElement.querySelector(".shadow--bottom");
                                        
                                        var currentScroll = E.scrollTop - E.offsetHeight;
                                        shadowTop.style.opacity = currentScroll;
                                        shadowBottom.style.opacity = 1-currentScroll;
                                    });
                                }
                            })
                        ]
                      })
                  ]
                }
              );
    wrapper.append(div);
    console.log("%c(づ￣ ³￣)づ %cCOMMENTOR IS RUNNING",
                "color: black; background-color: white; padding: 2px; border-radius: 100px",
                "color: #00f7ff; font-weight: 900; padding-left: 10px");
    let ids = [];
    function createComments(data)
    {
        if (comments.querySelector("[empty-placeholder]")) {
            comments.querySelector("[empty-placeholder]").remove();
        }
        let i = 0;
        data.forEach( e => {
            i++;
            if (ids.includes(e.id)) {
                return false;
            }
            ids.push(e.id);
            let content = ELEMENT("div", {
                attr: {
                    class: "_cmm_comments_col",
                    id: e.id
                },
                inner: [
                    ELEMENT("h3", {
                            attr: {
                                class: "_cmm_uname"
                            },
                            inner: e.name
                    }),
                    ELEMENT("div", {
                            attr: {
                                class: "_cmm_content"
                            },
                            inner: [
                                e.content,
                            ELEMENT("span", {
                                attr: {
                                    class: "_cmm_date"
                                },
                                inner: e.date
                            })
                        ]
                    })
                ]
            });
            comments.append(content);
            if (i == data.length) {
                if (isNew) {
                    content.classList.add("--active");
                    setTimeout(() => {
                        content.scrollIntoView({behavior: 'smooth'});
                    }, 500);
                }
            }
        });
    }
    window.addEventListener("click", (e) => {
        if(e.target == textarea){
            iconWrap.classList.add('_cmm_open');
        } else {
            if (! e.target.classList.contains("_cmm_icon")) {
                iconWrap.classList.remove('_cmm_open');
            }
        }
    });
    function verify() {
        let canvas, input, math, mathList = ["−", "+", "×", "÷"], coutDown, time = 0;
        function start(el)
        {
            let mathType = mathList[Math.floor(Math.random()*mathList.length)];
            math = {
                point1: mathType == "÷" ? randomIntFromInterval(1, 10) : randomIntFromInterval(0, 10),
                point2: mathType == "÷" ? randomIntFromInterval(1, 10) : randomIntFromInterval(0, 10),
                method  : mathType
            };
            canvas = el;
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "15px Georgia";
            ctx.fillText("pass boot verification", 10, 50);
            
            ctx.font = "3rem Verdana";
            // Create gradient
            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop(randomIntFromInterval(0,1)," magenta");
            gradient.addColorStop(randomIntFromInterval(0,1), "blue");
            gradient.addColorStop(randomIntFromInterval(0,1), "red");
            // Fill with gradient
            ctx.fillStyle = gradient;
            ctx.fillText(math.point1 + math.method + math.point2 +" = ", 15, 100);
            
            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.moveTo(0, randomIntFromInterval(60, 150));
                ctx.lineTo(300, randomIntFromInterval(50, 150));
                ctx.stroke();
            }
        }
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const math_it_up = {
            '+': function (x, y) { return x + y; },
            '−': function (x, y) { return x - y; },
            '×': function (x, y) { return x * y; },
            '÷': function (x, y) { return x / y; }
        };
        return {
            setCanvas: E => {
                start(E);
            },
            setInput : E => {
                input = E;
            },
            isTrue : () => {
                let trueIs = math_it_up[math.method](math.point1, math.point2) === Number(input.value);
                if (trueIs) {
                    start(canvas);
                    input.value = "";
                }
                return trueIs;
            },
            reload: (E) => {
                if (! E.getAttribute('disabled') && time == 0) {
                    time = 30;
                    clearInterval(coutDown);
                    start(canvas);
                    E.setAttribute('disabled', true);
                    E.innerHTML = time;
                    coutDown = setInterval(() =>{
                        time--;
                        E.innerHTML = time;
                        if (time == 0) {
                            E.innerHTML = null;
                            E.removeAttribute('disabled');
                            clearInterval(coutDown);
                        }
                    }, 1000);
                }
            }
        };
    }
    return {
        wrapper: wrapper,
        onSave : (e) => {
            onSave = e;
            if (e.countDown) {
                submitBTN.setAttribute('disabled', true);
            }
        },
        countDown: E => {
            countDown = E;
        },
        setContentID: (e) => { contentID = e; },
        option: (e) => {
            Min = e.Min;
            Max = e.Max;
            textareaManeger.option(e);
        },
        create: (e) => {
            createComments(e);
        },
        setUser: E => {
            nameInput.value = E.name;
            emailInput.value = E.email;
            if (E.name.length > 0) nameInput.disabled = true;
            if (E.email.length > 0) emailInput.disabled = true;
        },
        setTitle: E => {
            heading.innerHTML = E;
        }
    };
}
function ELEMENT(element = "div", data = {attr: {}, inner: [], todo: null}) {
    let a = document.createElement(element),
    attr = data ? data.attr : {},
    inner = data ? data.inner : '',
    todo = data ? data.todo : null;
    if (attr) {
        Object.keys(attr).forEach((b) => {
            let normalize = b.replace(/[A-Z]/g, '-$&').toLowerCase();
            a.setAttribute(normalize, attr[b]);
        });
    }
    a.setInner = (c) => {
        switch (typeof c) {
            case 'string':
                a.innerHTML = c;
                break;
            case 'object':
                if(Array.isArray(c)){
                    c.forEach((d)=>{
                        a.append(d);
                    });
                } else {
                    a.append(c);
                }
                break;
            default:
                console.error("（；￣ェ￣） ERROR: can't set inner because value type is unknown !");
                break;
        }
    };
    a.getInner = () => {
        return a.innerHTML;
    };
    a.onInput = function(minLength, maxLength, exeption = "//g") {
        a.addEventListener("keypress", event => {
            if (event.keyCode != 8 && event.key.match(exeption)) {
                event.preventDefault();
                return false;
            }
        });
        a.addEventListener("keydown", event => {
            if (event.keyCode != 8 && event.key.match(exeption)) {
                event.preventDefault();
                return false;
            }
        });
        a.addEventListener("keyup", event => {
            if (event.keyCode != 8 && event.key.match(exeption)) {
                event.preventDefault();
                return false;
            }
        });
        a.addEventListener("input", () => {
            a.value = a.value.replace(exeption, "");
            a.setAttribute("maxlength", maxLength);
            a.setAttribute("minlength", minLength);
        });
    };
    
    if (inner) a.setInner(inner);
    if (todo) todo(a);
    
    return a;
}
function TextareaManeger() {
   let textarea, ilegalString;
    return {
        setElement: (element) => {
            textarea = element;
        },
        insertAtCaret: (text) => {
            if(textarea == null){ alert("you have to set the element first :`("); return false; }	  
            let textTo = " " + text + " ",
            startPos = textarea.selectionStart,
            endPos = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, startPos) + textTo + textarea.value.substring(endPos, textarea.value.length);
            textarea.focus();
            textarea.selectionEnd = startPos + textTo.length;
        },
        getValue: () => {
            return textarea.value;
        },
        focus: () => {
            textarea.focus();
        },
        option: (e) => {
            textarea.onInput(e.Min, e.Max, e.illegalString);
            ilegalString = e;
        }
    };
}
