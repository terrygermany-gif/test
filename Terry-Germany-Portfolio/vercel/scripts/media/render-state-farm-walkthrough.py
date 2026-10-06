"""Original UI motion study matching the supplied State Farm assistant reference.
Connected icon stepper, timestamped conversation, barcode and action cards.
Illustrative animation, not a recording of a shipped product. Pillow + FFmpeg.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from fontTools.ttLib import TTFont
from pathlib import Path
import subprocess, math, sys, functools
ROOT=Path(__file__).resolve().parents[2]; OUT=ROOT/'public/work'
W,H,FPS,DURATION=1440,1080,24,28
RED='#f40024'; INK='#3b3b3b'; MUTED='#777777'; LINE='#d9d9d9'
font_path=Path('/tmp/state-farm-video-inter.ttf')
f=TTFont(ROOT/'public/fonts/state-farm-inter.woff'); f.flavor=None; f.save(font_path)
@functools.lru_cache(None)
def font(size,bold=False):
    f=ImageFont.truetype(str(font_path),size)
    try:f.set_variation_by_axes([14,650 if bold else 400])
    except Exception:pass
    return f

def text(d,xy,value,size=21,color=INK,bold=False):d.text(xy,value,font=font(size,bold),fill=color)
def paragraph(d,xy,value,size=21,width=580,color=INK,bold=False,line=32):
    lines=[];row=''
    for word in value.split():
        trial=(row+' '+word).strip()
        if row and d.textlength(trial,font=font(size,bold))>width:lines.append(row);row=word
        else:row=trial
    if row:lines.append(row)
    for i,row in enumerate(lines):text(d,(xy[0],xy[1]+i*line),row,size,color,bold)
    return len(lines)*line

def star(d,x,y,size=15):
    d.polygon([(x,y-size),(x+size*.22,y-size*.22),(x+size,y),(x+size*.22,y+size*.22),(x,y+size),(x-size*.22,y+size*.22),(x-size,y),(x-size*.22,y-size*.22)],fill=RED)

def icon(d,x,y,kind,color=INK):
    if kind=='person':
        d.ellipse((x-5,y-12,x+5,y-2),outline=color,width=3);d.rounded_rectangle((x-9,y+2,x+9,y+13),radius=3,outline=color,width=3)
    elif kind=='car':
        d.rounded_rectangle((x-14,y-3,x+14,y+9),radius=3,outline=color,width=3)
        d.line([(x-10,y-3),(x-6,y-12),(x+6,y-12),(x+10,y-3)],fill=color,width=3)
        d.ellipse((x-10,y+5,x-5,y+12),fill=color);d.ellipse((x+5,y+5,x+10,y+12),fill=color)
    elif kind=='shield':
        d.line([(x,y-15),(x+13,y-9),(x+11,y+7),(x,y+16),(x-11,y+7),(x-13,y-9),(x,y-15)],fill=color,width=3)
        d.line([(x-6,y),(x-1,y+5),(x+7,y-5)],fill=color,width=3)

def button(d,y,label,outline=False,x=48,width=564):
    d.rounded_rectangle((x,y,x+width,y+62),radius=11,fill='white' if outline else RED,outline=RED,width=2)
    tw=d.textlength(label,font=font(23,True));text(d,(x+(width-tw)/2,y+18),label,23,RED if outline else 'white',True)

def assistant(d,y):
    star(d,31,y+12,9);text(d,(47,y),'Digital Assistant • 4:32 PM',18)

def tap(layer,t,x,y,start):
    if not start<=t<start+.9:return
    p=(t-start)/.9;d=ImageDraw.Draw(layer);r=12+35*p
    d.ellipse((x-r,y-r,x+r,y+r),outline=(244,0,36,int(180*(1-p))),width=3)
    d.ellipse((x-7,y-7,x+7,y+7),fill=(35,35,35,210))

def scan_art(d,y,t):
    d.rounded_rectangle((22,y,638,y+271),radius=12,fill='#f4f4f4')
    d.rectangle((22,y+244,638,y+271),fill='#f4f4f4')
    d.rounded_rectangle((165,y+45,499,y+224),radius=7,fill='#dddddd')
    d.rounded_rectangle((163,y+42,497,y+220),radius=7,fill='white')
    for i in range(57):
        x=188+i*5;d.rectangle((x,y+67,x+1+(i%3==0),y+118),fill='#202020')
    for i,w in enumerate([228,170,198]):d.rounded_rectangle((188,y+136+i*25,188+w,y+147+i*25),radius=5,fill='#e6e6e6')
    # Reference-style four red scan corners.
    for x,sgn in [(141,1),(519,-1)]:
        for yy,vsgn in [(y+22,1),(y+242,-1)]:d.line([(x+35*sgn,yy),(x,yy),(x,yy+35*vsgn)],fill=RED,width=5)
    if 4.8<=t<8:
        yy=y+30+(t-4.8)/3.2*202
        d.line((145,yy,515,yy),fill=RED,width=3)
        text(d,(220,y+251),'Reading barcode…',15,MUTED)

CW,CH=660,1320
BODY_Y,BODY_H=195,987
# Conversation is rendered separately so it scrolls behind the fixed stepper and composer.
def body(t):
    canvas=Image.new('RGBA',(CW,1600),'white');d=ImageDraw.Draw(canvas)
    phase=0 if t<8 else 1 if t<14 else 2 if t<20 else 3
    if phase==0:
        text(d,(497,20),'You • 4:32 PM ✓',17)
        d.rounded_rectangle((403,59,638,122),radius=25,fill='#f1f1f1')
        text(d,(423,78),'I’d like an auto quote',20)
        assistant(d,146)
        text(d,(22,189),'Happy to help with a quote! Let me get started.',21)
        text(d,(22,224),'Can you share your driver’s license details?',21)
        card_y=271
        d.rounded_rectangle((22,card_y,638,card_y+662),radius=12,fill='white',outline='#d4d4d4',width=2)
        scan_art(d,card_y,t)
        text(d,(48,card_y+305),'Speed up your quote',25,INK,True)
        paragraph(d,(48,card_y+352),"Snap or upload a pic of the back of your license. Your image isn’t stored, and manual entry is always available.",21,564,line=31)
        button(d,card_y+453,'Scan barcode' if t<4.8 else 'Reading barcode…')
        button(d,card_y+529,'Enter info manually',True)
        icon(d,61,card_y+621,'shield','#197653')
        paragraph(d,(83,card_y+605),"Your license photo isn’t stored after processing, and your information is protected.",17,515,line=26)
        tap(canvas,t,330,card_y+484,4.4)
    elif phase==1:
        assistant(d,22)
        paragraph(d,(22,65),'Your details are ready. Review the information before we continue.',23,594,line=34)
        cy=168
        d.rounded_rectangle((22,cy,638,cy+555),radius=12,fill='white',outline='#d4d4d4',width=2)
        d.rounded_rectangle((23,cy+1,637,cy+187),radius=12,fill='#f4f4f4')
        # Minimal car illustration within the card.
        d.rounded_rectangle((172,cy+66,488,cy+130),radius=24,fill='#e3e3e6',outline='#bebec5',width=2)
        d.polygon([(217,cy+66),(255,cy+30),(388,cy+30),(431,cy+66)],fill='#d9e0e5')
        for x in [231,430]:d.ellipse((x-20,cy+108,x+20,cy+148),fill='#44444b');d.ellipse((x-9,cy+119,x+9,cy+137),fill='#d9d9df')
        text(d,(48,cy+218),'Your car, your next step',25,INK,True)
        paragraph(d,(48,cy+269),'Confirm your information before moving on. You can edit anything that needs updating.',21,564,line=32)
        button(d,cy+360,'Confirm & continue')
        button(d,cy+437,'Edit details',True)
        tap(canvas,t,330,cy+391,12.3)
    elif phase==2:
        assistant(d,22)
        paragraph(d,(22,65),'What matters most as you explore coverage?',23,594,line=34)
        cy=160
        d.rounded_rectangle((22,cy,638,cy+576),radius=12,fill='white',outline='#d4d4d4',width=2)
        text(d,(48,cy+29),'Start with your priorities',25,INK,True)
        paragraph(d,(48,cy+78),'Choose a starting point. We’ll help you compare the options.',21,562,line=32)
        choices=[('Lower monthly cost','Explore affordability.'),('More protection','Look at broader coverage.'),('Help me compare','Understand the differences.')]
        for i,(title,desc) in enumerate(choices):
            y=cy+184+i*111;active=i==1 and t>=18.3
            d.rounded_rectangle((48,y,612,y+91),radius=11,fill='#fff0f2' if active else '#fafafa',outline=RED if active else '#d8d8d8',width=2)
            text(d,(70,y+17),title,23,INK,True);text(d,(70,y+52),desc,18,MUTED)
            d.ellipse((562,y+33,586,y+57),outline=RED if active else '#bbbbbb',width=2)
            if active:d.ellipse((568,y+39,580,y+51),fill=RED)
        tap(canvas,t,575,cy+329,18.1)
    else:
        text(d,(497,20),'You • 4:32 PM ✓',17)
        d.rounded_rectangle((445,59,638,122),radius=25,fill='#f1f1f1');text(d,(466,78),'More protection',20)
        assistant(d,154)
        paragraph(d,(22,199),'Let’s review your options. You can connect with an agent whenever you need help.',23,594,line=34)
        cy=313
        d.rounded_rectangle((22,cy,638,cy+485),radius=12,fill='white',outline='#d4d4d4',width=2)
        text(d,(48,cy+30),'Guidance that stays with you',25,INK,True)
        paragraph(d,(48,cy+81),'Compare your coverage choices, understand the next step, and keep human support close.',21,560,line=32)
        button(d,cy+215,'Review options')
        button(d,cy+292,'Talk to an agent',True)
        icon(d,66,cy+399,'shield','#197653')
        paragraph(d,(91,cy+379),'Your goals and context guide the experience.',19,495,line=29)
        tap(canvas,t,330,cy+323,24.5)
    return canvas

boundaries=[8,14,20]
def app(t):
    frame=Image.new('RGBA',(CW,CH),'white');d=ImageDraw.Draw(frame)
    # Drawer header, drag handle, icon controls, and assistant brand.
    d.rounded_rectangle((297,12,363,16),radius=2,fill='#8c8c8c')
    for y in [37,45,53]:d.line((28,y,53,y),fill=INK,width=3)
    star(d,233,44,18);star(d,249,29,7)
    text(d,(264,31),'Digital Assistant',26,INK,True)
    d.line((538,45,556,45),fill=INK,width=3)
    d.line((609,33,630,55),fill=INK,width=3);d.line((630,33,609,55),fill=INK,width=3)
    d.line((0,86,CW,86),fill=LINE,width=2)
    active=0 if t<8 else 1 if t<20 else 2
    progress=0 if t<8 else min(1,(t-8)/.7) if t<20 else 1+min(1,(t-20)/.7)
    nodes=[52,330,606];d.line((52,122,606,122),fill=LINE,width=5)
    if progress:d.line((52,122,52+277*progress,122),fill=INK,width=5)
    for i,(x,label,kind) in enumerate(zip(nodes,['You','Your car','Your quote'],['person','car','shield'])):
        d.ellipse((x-20,102,x+20,142),fill=INK if i<=active else '#f9f9f9',outline=INK if i<=active else LINE,width=3)
        icon(d,x,122,kind,'white' if i<=active else INK)
        tw=d.textlength(label,font=font(19,i==active));text(d,(x-tw/2,155),label,19,INK,i==active)
    d.line((0,194,CW,194),fill=LINE,width=2)
    content=body(t)
    # Ease each new card upward, with a quiet crossfade from the previous conversation.
    for b in boundaries:
        if b<=t<b+.5:
            p=(t-b)/.5;e=p*p*(3-2*p)
            shifted=Image.new('RGBA',content.size,'white');shifted.alpha_composite(content,(0,int(36*(1-e))))
            content=Image.blend(body(b-.001),shifted,e)
    frame.alpha_composite(content.crop((0,0,CW,BODY_H)),(0,BODY_Y))
    # Feedback actions and persistent composer.
    d.rectangle((0,1182,CW,CH),fill='white')
    text(d,(35,1185),'Useful?',16,MUTED)
    d.rounded_rectangle((120,1182,155,1214),radius=7,outline=LINE,width=1);text(d,(132,1186),'+',20,MUTED)
    d.rounded_rectangle((169,1182,204,1214),radius=7,outline=LINE,width=1);text(d,(182,1186),'−',20,MUTED)
    d.rounded_rectangle((22,1231,638,1301),radius=5,fill='white',outline='#d4d4d4',width=2)
    text(d,(42,1250),'Type a message',23,MUTED)
    d.line([(587,1251),(614,1266),(587,1280),(591,1266),(587,1251)],fill='#969696',width=3)
    return frame

base=Image.new('RGBA',(W,H),'#111015')
glow=Image.new('RGBA',(W,H));gd=ImageDraw.Draw(glow);gd.ellipse((800,390,1450,1100),fill=(120,12,35,38));base.alpha_composite(glow.filter(ImageFilter.GaussianBlur(90)))
SCALE=.72; AX,AY=897,60; AW,AH=int(CW*SCALE),int(CH*SCALE)
shadow=Image.new('RGBA',(W,H));sd=ImageDraw.Draw(shadow);sd.rounded_rectangle((AX-8,AY+10,AX+AW+8,AY+AH+20),radius=25,fill=(0,0,0,160));base.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(25)))
copy=[('A simple start','Describe the goal. Get a clear next step.'),('Review before moving on','Capture the details, then confirm or edit.'),('Make the choice clearer','Use customer priorities to guide the conversation.'),('Digital guidance. Human support.','Keep help close as the customer reviews their options.')]
def render(t):
    image=base.copy();d=ImageDraw.Draw(image);idx=0 if t<8 else 1 if t<14 else 2 if t<20 else 3
    text(d,(86,99),'STATE FARM / DIGITAL ASSISTANT',18,'#aaa5b4',True)
    text(d,(86,276),f'0{idx+1} / THE EXPERIENCE',16,'#ff6b80',True)
    paragraph(d,(86,325),copy[idx][0],42,690,'#f4f3f8',False,55)
    paragraph(d,(86,486),copy[idx][1],23,630,'#aaa5b4',line=35)
    for i in range(4):d.rounded_rectangle((86+i*65,626,136+i*65,631),radius=2,fill=RED if i<=idx else '#38333f')
    text(d,(86,965),'Illustrative prototype animation',16,'#8c8796')
    screen=app(t).resize((AW,AH),Image.Resampling.LANCZOS)
    mask=Image.new('L',(AW,AH));ImageDraw.Draw(mask).rounded_rectangle((0,0,AW-1,AH-1),radius=22,fill=255)
    image.paste(screen,(AX,AY),mask)
    d=ImageDraw.Draw(image);d.rounded_rectangle((AX-1,AY-1,AX+AW,AY+AH),radius=22,outline='#79747f',width=1)
    return image.convert('RGB')
OUT.mkdir(parents=True,exist_ok=True)
if '--preview' in sys.argv:
    for t in [3,6,10,16,23]:render(t).save(Path('/tmp')/f'sf-v2-{t}.jpg',quality=95)
else:
    p=subprocess.Popen(['ffmpeg','-y','-v','error','-f','rawvideo','-pixel_format','rgb24','-video_size',f'{W}x{H}','-framerate',str(FPS),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'state-farm-digital-assistant-walkthrough.mp4')],stdin=subprocess.PIPE)
    for i in range(FPS*DURATION):p.stdin.write(render(i/FPS).tobytes())
    p.stdin.close()
    if p.wait()!=0:raise RuntimeError('Video encoding failed')
    render(3).save(OUT/'state-farm-digital-assistant-walkthrough.jpg',quality=95)
    print('Rendered reference-based 28-second UI animation.')
