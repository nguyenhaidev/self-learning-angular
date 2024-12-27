import {Component, computed, OnInit, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CommonModule, NgIf} from '@angular/common';
import {delay, of} from 'rxjs';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-fortune-ranking',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  animations: [
    trigger('fadeAnimation', [
      state('void', style({opacity: 0})), // Initial state
      state('*', style({opacity: 1})),   // Final state
      transition(':enter', [              // Enter animation
        animate('500ms 600ms ease-in')
      ]),
      transition(':leave', [              // Leave animation
        animate('200ms ease-out')
      ])
    ])
  ],
  templateUrl: './fortune-ranking.component.html',
  styleUrl: './fortune-ranking.component.scss'
})
export class FortuneRankingComponent implements OnInit {
  fortuneRanking = signal(0)
  currentStep = signal(1)
  dateOfBirthForm = this.fb.group({
    day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
    month: [0, [Validators.required, Validators.min(1), Validators.max(12)]]
  })
  isChangingStep = signal(false)
  hasError = signal(false)
  bgColors = [
    'bg-gradient-to-b from-[#0F2027] via-[#203A43] to-[#2C5364]',
    'bg-gradient-to-b from-[#4568DC] to-[#B06AB3]',
    'bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]',
    'bg-gradient-to-b from-[#FC5C7D] to-[#6A82FB]'
  ]
  bgColor = signal('bg-gradient-to-b from-[#0F2027] via-[#203A43] to-[#2C5364]')

  constructor(private fb: FormBuilder) {
  }

  bdRank = [
    "1.5/12", "18.9/27", "35.5/4", "2.5/21", "19.4/4", "36.5/11", "3.5/30", "20.4/13", "37.5/20", "4.6/2", "21.4/22", "38.5/29", "5.9/8", "22.5/3", "39.6/1", "6.9/17", "23.5/10", "40.8/9", "7.9/26", "24.5/28", "41.8/18", "8.10/7", "25.1/8", "42.8/27", "9.5/13", "26.1/17", "43.1/14", "10.5/22", "27.1/26", "44.12/15", "11.5/31", "28.12/14", "45.12/24", "12.6/3", "29.12/23", "46.9/16", "13.1/7", "30.9/24", "47.9/25", "14.1/16", "31.10/5", "48.10/6", "15.1/25", "32.4/5", "49.2/6", "16.9/9", "33.4/14", "50.2/15", "17.9/18", "34.4/23", "51.2/24",
    "52.4/11", "70.12/30", "88.9/6", "53.4/29", "71.9/12", "89.1/11", "54.5/1", "72.9/21", "90.1/20", "55.5/7", "73.9/30", "91.1/29", "56.5/16", "74.10/2", "92.2/1", "57.5/25", "75.2/7", "93.6/12", "58.8/10", "76.2/16", "94.6/21", "59.8/19", "77.2/25", "95.6/30", "60.8/28", "78.4/12", "96.7/2", "61.1/6", "79.4/21", "97.12/13", "62.1/15", "80.4/30", "98.12/22", "63.1/24", "81.5/2", "99.12/31", "64.6/11", "82.5/6", "100.7/10", "65.6/20", "83.6/5", "101.7/19", "66.6/29", "84.10/16", "102.7/28", "67.7/1", "85.10/25", "103.10/1", "68.1/5", "86.11/6", "104.2/4", "69.12/21", "87.8/25", "105.2/13",
    "106.3/3", "124.12/5", "142.3/5", "107.4/8", "125.6/9", "143.3/14", "108.4/17", "126.6/27", "144.3/23", "109.4/26", "127.1/2", "145.4/7", "110.5/14", "128.12/9", "146.5/17", "111.5/23", "129.12/18", "147.5/26", "112.6/4", "130.12/27", "148.10/23", "113.10/8", "131.7/11", "149.11/4", "114.10/17", "132.7/20", "150.8/13", "115.10/26", "133.7/29", "151.8/22", "116.11/7", "134.8/1", "152.8/31", "117.8/8", "135.9/10", "153.9/3", "118.8/17", "136.9/19", "154.1/9", "119.8/26", "137.9/28", "155.1/18", "120.9/7", "138.2/5", "156.1/27", "121.1/10", "139.2/14", "157.11/16", "122.11/15", "140.2/23", "158.11/25", "123.11/24", "141.3/4", "159.12/6",
    "160.6/10", "178.5/9", "196.12/25", "161.6/19", "179.5/18", "197.7/9", "162.6/28", "180.5/27", "198.7/18", "163.7/8", "181.10/15", "199.7/27", "164.7/26", "182.10/24", "200.9/14", "165.8/7", "183.11/5", "201.9/23", "166.9/13", "184.9/2", "202.10/4", "167.9/22", "185.1/21", "203.2/9", "168.2/10", "186.1/30", "204.3/12", "169.2/19", "187.2/2", "205.3/30", "170.2/28", "188.11/22", "206.4/2", "171.3/6", "189.12/3", "207.4/18", "172.3/15", "190.6/6", "208.4/27", "173.3/24", "191.6/15", "209.5/15", "174.4/6", "192.6/24", "210.5/24", "175.4/15", "193.7/5", "211.10/11", "176.4/24", "194.12/7", "212.10/20", "177.5/5", "195.12/16", "213.10/29",
    "214.11/1", "232.7/23", "250.1/19", "215.8/11", "233.8/4", "251.1/28", "216.8/20", "234.9/11", "252.11/10", "217.8/29", "235.9/20", "253.11/19", "218.9/1", "236.9/29", "254.11/28", "219.1/13", "237.2/8", "255.6/13", "220.1/22", "238.2/17", "256.6/22", "221.1/31", "239.2/26", "257.7/3", "222.2/3", "240.3/13", "258.1/4", "223.11/14", "241.3/22", "259.12/11", "224.11/23", "242.3/31", "260.12/20", "225.12/4", "243.4/3", "261.12/29", "226.7/4", "244.4/10", "262.8/3", "227.1/3", "245.4/19", "263.10/3", "228.12/10", "246.4/28", "264.2/20", "229.12/19", "247.5/8", "265.2/29", "230.12/28", "248.8/14", "266.3/1", "231.7/14", "249.8/23", "267.3/9",
    "268.3/18", "286.7/12", "304.11/17", "269.3/27", "287.7/21", "305.11/26", "270.4/16", "288.7/30", "306.6/8", "271.4/25", "289.8/2", "307.6/17", "272.5/19", "290.9/15", "308.6/26", "273.10/9", "291.2/12", "309.7/7", "274.10/18", "292.2/21", "310.7/15", "275.10/27", "293.3/2", "311.7/24", "276.8/15", "294.3/8", "312.2/18", "277.8/24", "295.4/9", "313.2/27", "278.9/5", "296.10/12", "314.3/7", "279.1/12", "297.10/21", "315.3/16", "280.6/16", "298.10/30", "316.3/25", "281.6/25", "299.8/12", "317.4/20", "282.1/1", "300.8/21", "318.10/13", "283.12/8", "301.8/30", "319.10/22", "284.12/17", "302.1/23", "320.10/31", "285.12/26", "303.11/8", "321.11/3",
    "322.9/4", "340.11/21", "358.8/5", "323.11/11", "341.11/30", "359.3/17", "324.11/20", "342.12/2", "360.3/26", "325.11/29", "343.6/7", "361.10/14", "326.6/14", "344.7/6", "362.12/1", "327.6/23", "345.7/13", "363.7/17", "328.12/12", "346.7/22", "364.3/10", "329.7/16", "347.7/31", "365.11/13", "330.7/25", "348.2/22", "366.3/21", "331.8/6", "349.3/11", "332.2/11", "350.3/20", "333.3/19", "351.3/29", "334.3/28", "352.4/1", "335.10/10", "353.11/2", "336.10/19", "354.11/9", "337.10/28", "355.11/18", "338.8/16", "356.11/27", "339.11/12", "357.6/18"
  ]

  isFieldValid(name: string): boolean {
    return !!this.dateOfBirthForm.get(name)?.valid
  }

  updateStep(value: number) {
    this.isChangingStep.set(true)
    const oldValue: number = this.currentStep()
    if (oldValue == 1 && value < 0) {
      return
    }
    this.currentStep.set(0)
    of(true).pipe(
      delay(200)
    ).subscribe(() => {
      if (value < 0) {
        if (oldValue == 2) {
          this.dateOfBirthForm.controls.month.reset()
        }

        if (oldValue == 3) {
          this.dateOfBirthForm.controls.day.reset()
        }
      }
      this.isChangingStep.set(false)
      this.currentStep.set(oldValue + value)
      this.bgColor.set(this.bgColors[oldValue + value - 1])
    })
  }

  onSelectMonth(value: number) {
    this.dateOfBirthForm.controls.month.setValue(value)
  }

  onSubmit() {
    if (!this.dateOfBirthForm.valid) {
      return
    }
    const {day, month} = this.dateOfBirthForm.value
    if (!!day && !!month) {
      const birthdayWithRank = this.bdRank.find((e: string) => e.endsWith(`.${+month}/${+day}`))
      if (!birthdayWithRank) {
        this.hasError.set(true)
        return
      }
      const rank = birthdayWithRank.slice(0, birthdayWithRank.indexOf('.'))
      this.fortuneRanking.set(+(rank))
      this.updateStep(1)
    }
  }

  reset() {
    this.dateOfBirthForm.reset()
    this.currentStep.set(2)
  }

  ngOnInit() {
    this.isChangingStep.set(true)
    of(true).pipe(
      delay(1300)
    ).subscribe(() => {
      this.isChangingStep.set(false)
    })
  }

  protected readonly Array = Array;
}
